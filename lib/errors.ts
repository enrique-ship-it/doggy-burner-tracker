// Tipos de error personalizados para mejor debugging

export class BurnTrackerError extends Error {
  constructor(message: string, public code: string) {
    super(message);
    this.name = 'BurnTrackerError';
  }
}

export class ScannerError extends BurnTrackerError {
  constructor(message: string) {
    super(message, 'SCANNER_ERROR');
    this.name = 'ScannerError';
  }
}

export class ValidationError extends BurnTrackerError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
  }
}

export class NFTMintError extends BurnTrackerError {
  constructor(message: string) {
    super(message, 'NFT_MINT_ERROR');
    this.name = 'NFTMintError';
  }
}

export class ApiError extends BurnTrackerError {
  constructor(message: string, public statusCode: number) {
    super(message, 'API_ERROR');
    this.name = 'ApiError';
  }
}
