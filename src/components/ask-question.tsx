import Questions from "./describe-question";

const AskQuestion: React.FC = (): React.ReactNode => {
    return (
        <section className="pt-20 md:pt-[150px] pb-20 w-full flex justify-center items-center">
            <Questions
                question={{
                    questionDescription:
                        "lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum",
                    questionTitle: "lorem ipsum dolor sit amet?",
                    theme: "lorem ipsum dolor sit amet afdsf afasejk fwejk fwejkf ",
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