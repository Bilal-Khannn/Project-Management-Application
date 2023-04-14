// function Landing() {
//   return (
//     <>
//       {/* Home screen  */}
//       <div className=" h-full w-full absolute flex bg-gradient-to-r from-indigo-300 via-purple-500 to-pink-400">
//         <div className="w-1/2 flex justify-center items-center flex-col">
//           <p className="w-10/12 text-5xl font-bold text-white">
//             Introducing PlanIt - your all-in-one project management solution.
//           </p>
//           <p className="w-10/12 mt-4 text-xl text-white">
//             Collaborate with your team members, assign tasks, and monitor
//             progress, all from a single, intuitive dashboard.
//           </p>
//         </div>

//         <div className="flex justify-center items-center h-auto w-1/2">
//           <img
//             className="h-1/2 w-auto border b"
//             src="src/assets/landingpage.png"
//             alt="Project Management Image"
//           />
//         </div>
//       </div>

//       {/* Features */}
//       <div className="flex justify-center mt-20">
//         <div className="flex flex-col items-center mr-4">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-2">Feature 1</h3>
//             <p className="text-gray-600 mb-4">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//               blandit velit at velit lobortis, eu aliquet nibh eleifend.
//             </p>
//             <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
//               Read More
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col items-center mr-4">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-2">Feature 2</h3>
//             <p className="text-gray-600 mb-4">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//               blandit velit at velit lobortis, eu aliquet nibh eleifend.
//             </p>
//             <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
//               Read More
//             </button>
//           </div>
//         </div>

//         <div className="flex flex-col items-center">
//           <div className="bg-white p-4 rounded-lg shadow-lg">
//             <h3 className="text-lg font-semibold mb-2">Feature 3</h3>
//             <p className="text-gray-600 mb-4">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
//               blandit velit at velit lobortis, eu aliquet nibh eleifend.
//             </p>
//             <button className="bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
//               Read More
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

function Landing() {
  return (
    <>
      {/* Home screen  */}
      <div className=" h-full w-full absolute flex bg-gradient-to-r from-indigo-300 via-purple-500 to-pink-400">
        <div className="w-1/2 flex justify-center items-center flex-col">
          <p className="w-10/12 text-5xl font-bold text-white">
            Introducing PlanIt - your all-in-one project management solution.
          </p>
          <p className="w-10/12 mt-4 text-xl text-white">
            Collaborate with your team members, assign tasks, and monitor
            progress, all from a single, intuitive dashboard.
          </p>
        </div>

        <div className="flex justify-center items-center h-auto w-1/2">
          <img
            className="h-1/2 w-auto border b"
            src="src/assets/landingpage.png"
            alt="Project Management Image"
          />
        </div>
      </div>

      {/* Features */}
      <div className="flex justify-between w-full mt-10">
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg mr-4">
          <p className="text-xl font-bold mb-2">Feature 1</p>
          <p>Some random content about feature 1.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Read more
          </button>
        </div>
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg mr-4">
          <p className="text-xl font-bold mb-2">Feature 2</p>
          <p>Some random content about feature 2.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Read more
          </button>
        </div>
        <div className="w-1/3 bg-white p-4 rounded-lg shadow-lg">
          <p className="text-xl font-bold mb-2">Feature 3</p>
          <p>Some random content about feature 3.</p>
          <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
            Read more
          </button>
        </div>
      </div>
    </>
  );
}

export default Landing;
