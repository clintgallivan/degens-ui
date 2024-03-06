import Card from '@components/common/Card';
import UserLeaderboardsGeneral from '../components/UserLeaderboardsGeneral';
import UserLeaderboardsSearchAndFilter from '../components/UserLeaderboardsSearchAndFilter';
import UserLeaderboardsTable from '../components/UserLeaderboardsTable';

export default function UserLeaderboardsSection({ props }: any) {
    return (
        <>
            <div className="content-area">
                <UserLeaderboardsGeneral props={props} />
                <UserLeaderboardsSearchAndFilter props={props} />
                <UserLeaderboardsTable props={props} />
            </div>
        </>
    );
}
