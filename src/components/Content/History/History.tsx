import { useState, useEffect } from 'react';
import { Table } from 'antd';
import api from '../../../http';
import moment from 'moment';
import { UserHistoryType } from '../../../Types/UserHistory.type';

const History = () => {
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    api.get("files/getHistory")
      .then(response => {
        const formattedData = response.data.map((item: UserHistoryType) => ({
          ...item,
          createdOn: moment(item.createdOn).format('YYYY-MM-DD HH:mm:ss'),
          key: item.id,
        }));
        setHistoryData(formattedData);
      })
      .catch(error => console.error('Error fetching activity data:', error));
  }, []);
  
  const columns = [
    {
      title: 'Action Time',
      dataIndex: 'createdOn',
      key: 'createdOn',
    },
    {
      title: 'File ID',
      dataIndex: 'fileId',
      key: 'fileId',
    },
    {
      title: 'File Name',
      dataIndex: 'fileName',
      key: 'fileName',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  return (
    <div>
      <Table dataSource={historyData} columns={columns} rowKey="id" />
    </div>
  );
};

export default History;
