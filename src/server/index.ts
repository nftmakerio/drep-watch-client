import { FILTER_TYPES } from "~/constants";
import { BASE_API_URL } from "~/data/api";
import { Answer, Drep, Proposal, Question } from "~/types";

async function getDreps(): Promise<{
  dreps: Drep[];
  questionAnswers: false;
}> {
  const res = await fetch(
    `https://cardano-sanchonet.blockfrost.io/api/v0/governance/dreps`,
    {
      headers: {
        project_id: "sanchonetIEt2wrapbiDfjpPqvill3wVOV7FPaLcI",
      },
    },
  );

  const dreps = (await res.json()) as {
    drep_id: string;
  }[];
  // console.log("GET DREPS CALLED")
  return {
    dreps: dreps.map((drep) => ({
      created_at: new Date().toISOString(),
      drep_id: drep.drep_id,
      email: drep.drep_id,
      name: drep.drep_id,
    })),
    questionAnswers: false,
  };
}
async function getLatestQuestions(): Promise<{
  answers: (Answer | undefined)[];
  questionAnswers: true;
  questions: Question[];
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

async function getDrepProposals(drep_id: string, fund_no: number) {
  try {
    const res = await fetch(
      `https://cardano-sanchonet.blockfrost.io/api/v0/governance/dreps/${drep_id}/votes`,
    );
    const proposals = (await res.json()) as {
      tx_hash: string;
      cert_index: number;
      vote: "yes" | "abstain" | "no";
    }[];

    return {
      proposals,
    };
  } catch (error) {
    console.log(error);
  }
}

async function getData(activeNum: number) {
  if (activeNum === FILTER_TYPES.LATEST_QUESTIONS) return getLatestQuestions();
  else if (activeNum === FILTER_TYPES.EXPLORE_DREPS) return getDreps();
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
