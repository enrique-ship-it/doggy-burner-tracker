// Types para el Doggy Burner Tracker

export interface BurnTransaction {
  signature: string;
  from: string;
  amount: number;
  timestamp: number;
  slot: number;
}

export interface BurnerStats {
  address: string;
  totalBurned: number;
  burnCount: number;
  level: 'bronce' | 'plata' | 'oro';
  firstBurn: number;
  lastBurn: number;
}

export interface GlobalStats {
  totalBurned: number;
  totalBurners: number;
  totalTransactions: number;
  lastUpdate: number;
}

export interface ApiResponse {
  burns: BurnTransaction[];
  leaderboard: BurnerStats[];
  stats: GlobalStats;
}
