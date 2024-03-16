import React from 'react';
import Image from 'next/image';
import trophy from '../public/images/trophy.svg';
import userimage from '../public/images/user.jpg';
import chevronup from '../public/images/chevron-up.svg';
import chevrondown from '../public/images/chevron-down.svg';

interface User {
    id: number;
    username: string;
    initial_weighin: number;
    next_weighin: number;
    weight: number;
}

interface UserID {
    uid: number;
}

interface Weight {
    weight_info: number;
}

interface GetWeightMax {
    weight_info: number;
    weight_max: number;
}

const WeightIndicator = (weight: Weight) => {
    if(weight.weight_info > 0) {
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

const TrophyIcon = (weight: GetWeightMax) => {

    if(weight.weight_info == weight.weight_max) {
        return(
            <div className="trophy-container float-right">
                <Image src={trophy} alt="Trophy" />
            </div>
        );
    }
}

const WeightInfo = (weight: Weight) => {
    let lost_gained: string;
    if(weight.weight_info > 0) {
        lost_gained = 'Lost';
    } else {
        lost_gained = 'Gained';
    }
    return(
        <span className="text-slate-500 sub-text">{lost_gained} {Math.abs(weight.weight_info).toFixed(2)}%</span>
    );
}

const UserPage = async () => {
    const res = await fetch('https://the-biggest-loser.onrender.com/');
    const users: User[] = await res.json();

    return (
        <div>
            <div className="leaderboard-header size-m">
                <strong><h1>The Biggest Loser Leaderboard</h1></strong>
            </div>
            <div className="leaderboard-container size-m">
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
                                {user.username}
                            </strong>
                            <WeightIndicator weight_info={user.weight} />
                        </div>
                        <WeightInfo weight_info={user.weight}/>
                    </div>
                    <TrophyIcon weight_info={user.weight} weight_max={users[0].weight} />
                </div>
            )}
            </div>
        </div>
      );
}

export default UserPage;