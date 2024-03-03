import { useEffect, useState } from "react";
import FileCard from "./FileCard";
import FileService from "../../../service/FileService";
import { FileData } from "../../../Types/FileData";
import { Col, FloatButton, Row, UploadFile, notification } from "antd";
import {
  DownloadOutlined,
  InboxOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import "./Dashboard.css";

function DashBoard() {
  const [files, setFiles] = useState<FileData[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    const data = await FileService.getAllFiles();
    setFiles(data);
  }

  const onUploadSuccess = async (options: any) => {
    try {
      await FileService.uploadFile(options);
      setFileList([]);
      await getData();
      setIsDragOver(false);
      notification.success({
        message: "Success!",
        description: "File upload successfully completed",
        duration: 2,
      });
    } catch (err) {
      notification.error({
        message: "Error!",
        description: "File upload failed",
        duration: 2,
      });
      console.log(err);
    }
  };

  const onDragOver = (e: any) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const onDragLeave = () => {
    setIsDragOver(false);
  };

  return (
    <div onDragOver={onDragOver} onDragLeave={onDragLeave}>
      {isDragOver || fileList.length > 0 ? (
        <Dragger
          customRequest={onUploadSuccess}
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          multiple={false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files.
          </p>
        </Dragger>
      ) : (
        <Row gutter={[15, 15]}>
          {files.map((file) => (
            <Col key={file.id} xs={24} sm={12} md={8} lg={6} xl={4}>
              <FileCard data={[file]} />
            </Col>
          ))}
        </Row>
      )}

      <FloatButton
        icon={isDragOver ? <DownloadOutlined /> : <UploadOutlined />}
        onClick={() => setIsDragOver(!isDragOver)}
      />
    </div>
  );
}

export default DashBoard;
