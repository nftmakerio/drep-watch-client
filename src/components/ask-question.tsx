import Questions from "./describe-question";

const AskQuestion: React.FC = (): React.ReactNode => {
  return (
    <section className="flex w-full items-center justify-center pb-20 pt-20 md:pt-[150px]">
      <Questions
        question={{
          question_description: "",
          question_title: "",
          theme: "",
        }}
      />
      {/* <Questions 
                question={{
                    theme: "",
                    questionDescription: "",
                    questionTitle: ""
                }}
            /> */}
    </section>
  );
};

export default AskQuestion;
