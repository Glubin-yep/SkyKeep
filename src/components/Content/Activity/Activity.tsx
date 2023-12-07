import { useState, useEffect } from 'react';
import { Table } from 'antd';
import api from '../../../http';
import moment from 'moment';
import { UserActivityType } from '../../../Types/UserActivity.type';

const Activity = () => {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    api.get("users/activity")
      .then(response => {
        const formattedData = response.data.map((item: UserActivityType) => ({
          ...item,
          loginTime: moment(item.loginTime).format('YYYY-MM-DD HH:mm:ss'),
          key: item.id,
        }));
        setActivityData(formattedData);
      })
      .catch(error => console.error('Error fetching activity data:', error));
  }, []);
  
  const columns = [
    {
      title: 'Login Time',
      dataIndex: 'loginTime',
      key: 'loginTime',
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: 'Browser',
      dataIndex: 'browser',
      key: 'browser',
    },
    {
      title: 'Platform',
      dataIndex: 'platform',
      key: 'platform',
    },
    {
      title: 'Device Type',
      dataIndex: 'deviceType',
      key: 'deviceType',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'User Agent',
      dataIndex: 'userAgent',
      key: 'userAgent',
    },
  ];

  return (
    <div>
      <Table dataSource={activityData} columns={columns} rowKey="id" />
    </div>
  );
};

export default Activity;
