export class ResourceNotFoundError extends Error {
    constructor(id: string, resource: string) {
      super(`${resource} with ID ${id} not found`);
    }
  }