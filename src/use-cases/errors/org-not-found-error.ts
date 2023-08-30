export class OrgNotFoundError extends Error {
    constructor(orgId: string) {
      super(`Org with ID ${orgId} not found`);
    }
  }