import React from 'react';
import Image from 'next/image';
import trophy from '../public/trophy.svg';
import userimage from '../public/user.jpg';
import chevronup from '../public/chevron-up.svg';
import chevrondown from '../public/chevron-down.svg';

interface User {
    id: number;
    name: string;
    email:string;
}

interface UserID {
    uid: number;
}

const WeightIndicator = (userid: UserID) => {
    if(userid.uid == 1) {
        return(
            <div className="chevron">
                <Image src={chevronup} alt="" />
            </div>
        );
    } else {
        return(
            <div className="chevron">
                <Image src={chevrondown} alt="" />
            </div>
        );
    }
}

const TrophyIcon = (userid: UserID) => {
    if(userid.uid == 1) {
        return(
            <div className="trophy-container float-right">
                <Image src={trophy} alt="Trophy" />
            </div>
        );
    }
}

const UserPage = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const users: User[] = await res.json();

    return (
        <div>
            <div className="leaderboard-header">
                <h1>The Biggest Loser Leaderboard</h1>
            </div>
            <div className="leaderboard-container">
            {users.map(user => 
                <div className="user-container rounded-md drop-shadow-sm" key={user.id}>
                    <div className="avatar user-img">
                        <div className="w-12 rounded-full">
                            <Image src={userimage} alt="User image" />
                        </div>
                    </div>
                    <div className="info-container">
                        <div className="flex">
                            <strong className="text-slate-700">
                                {user.name}
                            </strong>
                            <WeightIndicator uid={user.id} />
                        </div>
                        <span className="text-slate-500 sub-text">Lost 2kg</span>
                    </div>
                    <TrophyIcon uid={user.id} />
                </div>
            )}
            </div>
        </div>
      );
}

// function HomePage() {
//   return (
//     <div>
//         <div className="leaderboard-header">
//             <h1>The Biggest Loser Leaderboard</h1>
//         </div>
//         <div className="leaderboard-container">
//             <div className="user-container rounded-md drop-shadow-sm">
//                 <div className="avatar user-img">
//                     <div className="w-12 rounded-full">
//                         <Image src={userimage} alt="User image" />
//                     </div>
//                 </div>
//                 <div className="info-container">
//                     <div className="flex">
//                         <strong className="text-slate-700">
//                             {}
//                         </strong>
//                         <div className="chevron">
//                             <Image src={chevronup} alt="" />
//                         </div>
//                     </div>
//                     <span className="text-slate-500 sub-text">Lost 2kg</span>
//                 </div>
//                 <div className="trophy-container float-right">
//                     <Image src={trophy} alt="Trophy" />
//                 </div>
//             </div>
//         </div>
//     </div>
//   );
// }

export default UserPage;