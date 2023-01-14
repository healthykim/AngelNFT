import React, { useState } from "react"
import { DonateContract } from "../../contracts";

function MyHistory({account}) {
    const [donateHistory, setDoateHistory] = useState([]);

    const getDonateHistory = async() => {
        try {
            if(account) {
                const history = await DonateContract.methods.getDonateHistory(account).call();

                const tmpArr = [];
                history.map((v)=> {
                    const time = new Date(v.timeStamp*1000);
                    const year = time.getFullYear();
                    const month = time.getMonth() < 9 ? '0' + (time.getMonth() + 1) : time.getMonth() + 1;
                    const date = time.getDate();
                    const hour = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
                    const minute = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
                    tmpArr.push({timeStamp: `${year}/${month}/${date} ${hour}:${minute}`, amount: v.amount+" ETH", destinationId: v.destinationId})
                })
                console.log(tmpArr)
                setDoateHistory(tmpArr);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useState(()=>{
        getDonateHistory();
    }, [])

    return (
        <>
            Date | Amount | Destination <br/>

            {donateHistory.map((v, i) => {
                return(
                    <>
                        <p>{v.timeStamp} | {v.amount} | {v.destinationId}</p> 
                    </>
                )
            })}

            <p>DestinationID 대신 Name 반환하게끔 컨트랙트 수정할 것임</p> 
            <p>그리고 amount가 저런 이유는 우리가 아직 얼마 기부할지 설정을 안해서 그럼</p>
        </>
    )
}

export default MyHistory;