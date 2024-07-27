// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

import Exam from "./Exam/Exam";
import './CreateExam.css'

const CreateExam = () => {
  return (
    <>
      {/* <NavbarCreateExam /> */}
      <div className="w-full text-2xl pt-16">
        <div className="px-80 w-full">
          <div className="flex flex-wrap px-5 py-10 w-full">
            <div className="w-full lg:w-full md:w-full sm:w-full text-center text-3xl pb-5 font-bold">
              TẠO ĐỀ THI
            </div>
            <div className="w-full lg:w-full md:w-full sm:w-full text-3xl">
              <form
                className="formExam w-full mx-auto"
              >
                <Exam></Exam>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateExam;
