// After typing all of this I've realised it might have not been necessary
// because typescript already infers the type of json files

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

interface grade {
  grade: number;
  questions: question[];
}
