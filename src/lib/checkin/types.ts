export interface CheckInProvider {
  generateCredential(bookingId: string): Promise<string>;
  verifyCredential(bookingId: string, credential: string): Promise<boolean>;
  invalidateCredential(bookingId: string): Promise<void>;
}
