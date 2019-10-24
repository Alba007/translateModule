export interface ClickEvent {
    eventType: EventType;
 }
 
 export interface RowClick extends ClickEvent {
   item : any;
 }
 
 export enum EventType {
     ADD, ROW, EDIT
 }
 