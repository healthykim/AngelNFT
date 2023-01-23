import React from "react"
import { Link } from "react-router-dom";

function MyHistory({ donateHistories }) {


  if (donateHistories.length === 0) {
    return (
      <div className="py-8 flex flex-col items-center gap-6">
        <p className="text-center text-3xl">You haven't donated yet!</p>
        <Link to='/donate'>
          <div className="bg-ukblue py-2 px-12 m-auto rounded-xl text-2xl text-ukyellow font-semibold inline-block">
            Donate Now
          </div>
        </Link>
      </div>
    );
  }

  return (
    <>
      <table className="table-fixed w-full border-collapse border-y border-gray-500 mb-16">
        <thead>
          <tr>
            <th className="text-start border-y border-gray-500 py-4 pl-2 ">Date</th>
            <th className="text-start border-y border-gray-500 py-4 pl-2 ">Amount</th>
            <th className="text-start border-y border-gray-500 py-4 pl-2 ">Destination</th>
          </tr>
        </thead>
        <tbody>
          {
            donateHistories.map((donateHistory, i) => {
              return (
                <tr key={i} className="">
                  <td className="border-y border-gray-500 py-3 pl-2">{donateHistory.timeStamp}</td>
                  <td className="border-y border-gray-500 py-3 pl-2">{donateHistory.amount}</td>
                  <td className="border-y border-gray-500 py-3 pl-2">{donateHistory.destinationId}</td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
      {/* <p>DestinationID 대신 Name 반환하게끔 컨트랙트 수정할 것임</p> */}
      {/* <p>그리고 amount가 저런 이유는 우리가 아직 얼마 기부할지 설정을 안해서 그럼</p> */}
    </>
  )
}

export default MyHistory;
