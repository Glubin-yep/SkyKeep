import Meta from "antd/es/card/Meta";
import { FileData } from "../../../Types/FileData";
import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Avatar, Card, Typography } from "antd";
import FileService from "../../../service/FileService";
import "./FileCard.css"

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

export default function FileCard({ data }: { data: FileData[] }) {
  return data.map((item) => (
    <div key={item.id}>
      <Card
        loading={false}
        className="card"
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <DownloadOutlined
            key="download"
            onClick={() => FileService.downloadFile(item.id)}
          />,
          <DeleteOutlined key="setting" />,
        ]}
        
      >
        <Meta 
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
          }
          className="meta"
          title={
            <Typography.Text style={{ whiteSpace: "initial" }}>
            {item.originalName}
          </Typography.Text>
          }
          description={formatFileSize(item.size)}
        />
      </Card>
    </div>
  ));
}
