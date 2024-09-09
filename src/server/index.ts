import axios from "axios";
import { FILTER_TYPES } from "~/constants";
import { BASE_API_URL } from "~/data/api";
import { Answer, Drep, Proposal, Question } from "~/types";

async function getDreps(page: number): Promise<{
  dreps: Drep[];
  questionAnswers: false;
  nextPage: number | null;
}> {
  const { data } = await axios.get<{
    dreps: {
      drep_id: string;
      givenName: string | null;
      image: string | null;
    }[];
    nextPage: number | null;
  }>(`${BASE_API_URL}/api/v1/drep?page=${page}`);
  // console.log("GET DREPS CALLED")
  return {
    dreps: data.dreps,
    nextPage: data.nextPage,
    questionAnswers: false,
  };
}
async function getLatestQuestions(): Promise<{
  answers: (Answer | undefined)[];
  questionAnswers: true;
  questions: Question[];
  nextPage: number | null;
}> {
  const res = await fetch(`${BASE_API_URL}/api/v1/questions/latest`);
  const resJson = (await res.json()) as { questions: Question[] };
  console.log(resJson.questions, "fdasdfasf");
  const questionIds = await Promise.all(
    resJson.questions.map((question) =>
      fetch(`${BASE_API_URL}/api/v1/answers/${question.uuid}`),
    ),
  );
  const answers = (await Promise.all(
    questionIds.map((questionId) => questionId.json()),
  )) as Answer[];

  // console.log("GET LATEST QUESTIONS CALLED")
  return {
    answers: answers,
    questionAnswers: true,
    questions: resJson.questions,
    nextPage: null,
  };
}

async function getUserQuestions(wallet_address: string): Promise<{
  answers: (Answer | undefined)[];
  questionAnswers: true;
  questions: Question[];
}> {
  const res = await fetch(
    `${BASE_API_URL}/api/v1/questions?wallet_address=${wallet_address}`,
  );
  const questions = (await res.json()) as Question[];
  const questionIds = await Promise.all(
    questions.map((question) =>
      fetch(`${BASE_API_URL}/api/v1/answers/${question.uuid}`),
    ),
  );
  const answers = (await Promise.all(
    questionIds.map((questionId) => questionId.json()),
  )) as Answer[];

  // console.log("GET LATEST QUESTIONS CALLED")
  return {
    answers: answers,
    questionAnswers: true,
    questions: questions,
  };
}

async function getLatestAnswers(): Promise<{
  answers: Answer[];
  questionAnswers: true;
  questions: Question[];
  nextPage: number | null;
}> {
  const res = await fetch(`${BASE_API_URL}/api/v1/answers?latest=true`);
  const resJson = (await res.json()) as { answers: Answer[] };
  // console.log(resJson.answers)
  const questionsRes = await Promise.all(
    resJson.answers.map((ans) =>
      fetch(`${BASE_API_URL}/api/v1/questions/${ans.uuid}`),
    ),
  );
  const questions = (await Promise.all(
    questionsRes.map((el) => el.json()),
  )) as { question: Question }[];
  // console.log("GET LATEST ANSWERS CALLED")
  return {
    answers: resJson.answers,
    questionAnswers: true,
    questions: questions.map((el) => el.question),
    nextPage: null,
  };
}

async function getDrepQuestions(drep_id: string): Promise<
  | {
      answers: (Answer | undefined)[];
      questionAnswers: true;
      questions: Question[];
    }
  | undefined
> {
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/v1/questions?drep_id=${drep_id}`,
    );
    const questions = (await res.json()) as Question[];
    // console.log(questions, "resJson");

    // console.log(resJson.questions)
    const answers = await Promise.all(
      questions.map((question) =>
        fetch(`${BASE_API_URL}/api/v1/answers/${question.uuid}`)
          .then((data) => data.json() as Promise<Answer>)
          .catch((e) => undefined),
      ),
    );

    if (!answers) {
      return;
    }

    return {
      answers,
      questionAnswers: true,
      questions,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getDrepProposals(drep_id: string) {
  try {
    const res = await axios.get(
      `${BASE_API_URL}/api/v1/drep/proposals/${drep_id}`,
    );
    const proposals = res.data as {
      title: string;
      vote: "Yes" | "Abstain" | "No";
    }[];

    return {
      proposals,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getData(activeNum: number, page: number) {
  if (activeNum === FILTER_TYPES.LATEST_QUESTIONS) return getLatestQuestions();
  else if (activeNum === FILTER_TYPES.EXPLORE_DREPS) return getDreps(page);
  else return getLatestAnswers();
}

export {
  getDreps,
  getLatestQuestions,
  getLatestAnswers,
  getData,
  getDrepQuestions,
  getUserQuestions,
  getDrepProposals,
};
