export type ISODateString = `${number}-${number}-${number}`;

export type HomeApiResponse = {
  userId: string;
  currentStreak: number;
  todayCompletedCount: number;
  studiedDates: ISODateString[];
  todayCompleted: boolean;
};

export type HistoryItem = {
  id: string;

  word: string;
  meaning: string;

  userSentence: string;
  aiEvaluation: string;
  aiSentences: string[];

  createdAt: string;
};

export type HistoryApiResponse = HistoryItem[];

export type HistoryGroupedByDate = Record<ISODateString, HistoryItem[]>;
