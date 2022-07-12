import { useState } from "react";
import { ask, message } from "@tauri-apps/api/dialog";

const App = () => {
  const [text, setText] = useState("");
  const [calculating, setCalculating] = useState(false);

  return (
    <div className="h-screen">
      {calculating ? (
        <progress
          className="progress progress-error w-screen"
          value="100"
          max="100"
        ></progress>
      ) : (
        <progress
          className="progress progress-success w-screen"
          value="100"
          max="100"
        ></progress>
      )}
      <div className="w-screen h-full flex items-center justify-center">
        <div className="bg-base-100 border border-accent rounded-lg w-4/6 h-4/6 flex items-center justify-center text-center">
          <div>
            <div className="form-control w-full max-w-xs my-4">
              <label className="label">
                <span className="label-text">What is your height?</span>
              </label>
              <input
                type="text"
                placeholder="172"
                value={text}
                className={`input input-md w-full max-w-xs ${
                  calculating ? "input-disabled" : "input-bordered"
                }`}
                onChange={(e) =>
                  !calculating && setText(e.target.value.replace(/\D/g, ""))
                }
              />
              <label className="label">
                <span className="label-text-alt">cm</span>
              </label>
            </div>

            <button
              className={`btn btn-md btn-accent rounded-lg ${
                calculating && "btn-disabled"
              }`}
              onClick={async () => {
                if (text.length === 0) {
                  await message("Please enter your height.");
                  return;
                }

                const yes = await ask("Are you sure?", "Height Calculator");
                if (yes) {
                  const yes2 = await ask(
                    "This action cannot be reverted. Are you sure?",
                    { title: "Height Calculator", type: "warning" }
                  );
                  if (yes2) {
                    setCalculating(true);
                    setTimeout(() => {
                      setCalculating(false);
                      message(`Your height is ${text}cm.`);
                    }, 3000);
                  }
                }
              }}
            >
              {calculating ? "Calculating" : "Calculate Height"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
