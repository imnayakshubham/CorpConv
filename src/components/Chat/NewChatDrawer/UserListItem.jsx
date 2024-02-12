import { Avatar, Typography } from 'antd';

const { Text } = Typography

const UserListItem = ({ handleFunction, user }) => {
  return (
    <>
      <div className="user__container" onClick={handleFunction}>
        <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }} alt="">U</Avatar>
        <div>
          <h1>{user.public_user_name}</h1>
          {user.user_job_experience &&
            <Text fontSize="xs">
              <b>Experience : </b>
              {user.user_job_experience}
            </Text>
          }
        </div>

      </div>
    </>
  );
};

export default UserListItem;
