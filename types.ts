interface questionBase {
    question: string;
    isMultiChoice: boolean;
}

interface multiQuestion extends questionBase {
    isMultiChoice: true;
    answers: string[];
    correctIndex: number;
}

interface openQuestion extends questionBase {
    isMultiChoice: false;
}

type question = multiQuestion | openQuestion;

export interface questionGroup {
    grade: number;
    questions: question[];
}

export type adminTeams = { [key: string]: { house: string; score: number } };
