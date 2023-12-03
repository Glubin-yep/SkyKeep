import { CloudDownloadOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Card, Col, Progress, Row, Statistic } from "antd";
import { useEffect, type FC, useState } from "react";
import UserStatisticsService from "../../../service/UserStatisticsService";
import { UserStatisticsType } from "../../../Types/UserStatistics.type";

interface ProfileProps {}

const formatFileSize = (size: number): string => {
  if (size < 1024) {
    return `${size} B`;
  } else if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(2)} KB`;
  } else if (size < 1024 * 1024 * 1024) {
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  } else {
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
};

const Profile: FC<ProfileProps> = () => {
  const [statistics, setStatistics] = useState<UserStatisticsType>({
    id: 0,
    totalFiles: 0,
    usedStorage: 0,
    uploadedFiles: 0,
    downloadedFiles: 0,
    maxStorage: 0,
  });

  useEffect(() => {
    async function getData() {
      const data = await UserStatisticsService.getAllStatistics();
      setStatistics(data);
    }
    getData();
  }, []);

  return (
    <Card
      title="User Statistics"
      style={{ width: "400px", margin: "20px auto" }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Statistic title="Total Files" value={statistics?.totalFiles} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Used Storage"
            value={formatFileSize(statistics?.usedStorage)}
          />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={12}>
          <Statistic
            title="Uploaded Files"
            value={statistics?.uploadedFiles}
            prefix={<CloudUploadOutlined />}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Downloaded Files"
            value={statistics?.downloadedFiles}
            prefix={<CloudDownloadOutlined />}
          />
        </Col>
      </Row>
      <div style={{ marginTop: "20px" }}>
        <span>Storage Usage</span>
        <Progress
          percent={(statistics?.usedStorage / statistics.maxStorage) * 100}
          showInfo={false}
        />
         <div style={{ marginTop: "5px", textAlign: "center" }}>
          {formatFileSize(statistics?.usedStorage)} used out of {formatFileSize(statistics?.maxStorage)}
        </div>
      </div>
    </Card>
  );
};

export default Profile;
