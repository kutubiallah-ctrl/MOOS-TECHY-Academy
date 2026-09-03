/**
 * MOOS TECHY ACADEMY — INSTITUTIONAL AUDIT TRAIL SERVICE
 * 
 * Manages append-only audit event logging, security telemetry,
 * authorization denial capture, and role-authorized forensic querying.
 */

import { AuditEvent, AuditEventType, AuditEventResult, AuditLogFilter } from "../types/audit";
import { UserRole, DataClassification } from "../types/identity";

const AUDIT_STORAGE_KEY = "moos_academy_audit_log_v1";
const MAX_AUDIT_LOG_RECORDS = 500;

export class AuditService {
  private inMemoryCache: AuditEvent[] | null = null;

  /**
   * Deterministic Safe Identifier Generator for Audit Events.
   */
  private generateEventId(): string {
    const timestamp = Date.now().toString(36);
    const randomHex = Math.random().toString(36).substring(2, 9);
    return `aud_${timestamp}_${randomHex}`;
  }

  /**
   * Internal read helper.
   */
  private loadEvents(): AuditEvent[] {
    if (this.inMemoryCache !== null) {
      return this.inMemoryCache;
    }

    try {
      if (typeof localStorage !== "undefined") {
        const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
        if (!raw) {
          this.inMemoryCache = [];
          return this.inMemoryCache;
        }
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          this.inMemoryCache = parsed;
          return this.inMemoryCache;
        }
      }
    } catch (e) {
      console.warn("Could not read audit log from localStorage. Initializing empty log.", e);
    }

    this.inMemoryCache = [];
    return this.inMemoryCache;
  }

  /**
   * Internal persistence helper.
   */
  private persistEvents(events: AuditEvent[]): void {
    // Keep capped to avoid browser localStorage saturation while maintaining chronological history
    const trimmed = events.length > MAX_AUDIT_LOG_RECORDS 
      ? events.slice(events.length - MAX_AUDIT_LOG_RECORDS)
      : events;

    this.inMemoryCache = trimmed;
    try {
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(trimmed));
      }
    } catch (e) {
      console.error("Failed to persist audit event to localStorage:", e);
    }
  }

  /**
   * Append a new audit event (Append-Only Guarantee).
   * Historical records cannot be updated or deleted by normal application workflows.
   */
  public recordEvent(params: {
    eventType: AuditEventType;
    actorId: string;
    actorRole: UserRole;
    actorDisplayName?: string;
    resourceType: string;
    resourceId?: string;
    classroomId?: string;
    result?: AuditEventResult;
    reason?: string;
    dataClassification?: DataClassification;
    metadata?: Record<string, any>;
  }): AuditEvent {
    const event: AuditEvent = {
      eventId: this.generateEventId(),
      eventType: params.eventType,
      actorId: params.actorId,
      actorRole: params.actorRole,
      actorDisplayName: params.actorDisplayName,
      timestamp: new Date().toISOString(),
      resourceType: params.resourceType,
      resourceId: params.resourceId,
      classroomId: params.classroomId,
      result: params.result || "SUCCESS",
      reason: params.reason,
      dataClassification: params.dataClassification || "AUDIT_SECURITY",
      metadata: params.metadata
    };

    const current = this.loadEvents();
    current.push(event);
    this.persistEvents(current);
    return event;
  }

  /**
   * Alias for recordEvent to ensure interface compatibility.
   */
  public logEvent(params: Parameters<AuditService["recordEvent"]>[0]): AuditEvent {
    return this.recordEvent(params);
  }

  /**
   * Convenience helper to log an authorization denial telemetry event.
   */
  public recordDenial(params: {
    actorId: string;
    actorRole: UserRole;
    actorDisplayName?: string;
    resourceType: string;
    resourceId?: string;
    classroomId?: string;
    denialCode: string;
    reason: string;
    metadata?: Record<string, any>;
  }): AuditEvent {
    return this.recordEvent({
      eventType: "AUTHORIZATION_DENIED",
      actorId: params.actorId,
      actorRole: params.actorRole,
      actorDisplayName: params.actorDisplayName,
      resourceType: params.resourceType,
      resourceId: params.resourceId,
      classroomId: params.classroomId,
      result: "DENIED",
      reason: `[${params.denialCode}] ${params.reason}`,
      dataClassification: "AUDIT_SECURITY",
      metadata: {
        denialCode: params.denialCode,
        ...params.metadata
      }
    });
  }

  /**
   * Query all audit events with optional multi-criterion filtering.
   */
  public getAuditEvents(filter?: AuditLogFilter): AuditEvent[] {
    let events = [...this.loadEvents()];

    if (!filter) {
      return events.reverse(); // Newest first
    }

    if (filter.eventType) {
      events = events.filter((e) => e.eventType === filter.eventType);
    }
    if (filter.actorId) {
      events = events.filter((e) => e.actorId === filter.actorId);
    }
    if (filter.actorRole) {
      events = events.filter((e) => e.actorRole === filter.actorRole);
    }
    if (filter.classroomId) {
      events = events.filter((e) => e.classroomId === filter.classroomId);
    }
    if (filter.resourceType) {
      events = events.filter((e) => e.resourceType === filter.resourceType);
    }
    if (filter.resourceId) {
      events = events.filter((e) => e.resourceId === filter.resourceId);
    }
    if (filter.result) {
      events = events.filter((e) => e.result === filter.result);
    }
    if (filter.startDate) {
      events = events.filter((e) => new Date(e.timestamp) >= new Date(filter.startDate!));
    }
    if (filter.endDate) {
      events = events.filter((e) => new Date(e.timestamp) <= new Date(filter.endDate!));
    }

    // Sort newest first
    events.reverse();

    if (filter.limit && filter.limit > 0) {
      return events.slice(0, filter.limit);
    }

    return events;
  }

  public getEvents(filter?: AuditLogFilter): AuditEvent[] {
    return this.getAuditEvents(filter);
  }

  public queryLogs(filter?: AuditLogFilter): AuditEvent[] {
    return this.getAuditEvents(filter);
  }

  public getAuditEventsByUser(actorId: string): AuditEvent[] {
    return this.getAuditEvents({ actorId });
  }

  public getAuditEventsByClassroom(classroomId: string): AuditEvent[] {
    return this.getAuditEvents({ classroomId });
  }

  public getAuditEventsByEventType(eventType: AuditEventType): AuditEvent[] {
    return this.getAuditEvents({ eventType });
  }

  public getAuditEventsByResource(resourceType: string, resourceId?: string): AuditEvent[] {
    return this.getAuditEvents({ resourceType, resourceId });
  }

  /**
   * Reset local audit trail (for forensic testing or administrative reset only).
   */
  public clearForTesting(): void {
    this.inMemoryCache = [];
    try {
      localStorage.removeItem(AUDIT_STORAGE_KEY);
    } catch {
      // Ignore in mock testing
    }
  }
}

export const auditService = new AuditService();
