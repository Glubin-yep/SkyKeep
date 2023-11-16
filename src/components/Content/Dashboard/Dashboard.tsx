import  { useEffect, useState } from "react";
import FileCard from "./FileCard";
import FileService from "../../../service/FileService";
import { FileData } from "../../../Types/FileData";
import { Col, Row } from "antd";

function DashBoard() {
  const [files, setFiles] = useState<FileData[]>([]);

  useEffect(() => {
    async function getData() {
      const data = await FileService.getAllFiles();
      setFiles(data);
    }

    getData();
  }, []);
  return (
    <div>
    {files.length > 0 && (
      <Row gutter={[15, 15]}>
        {files.map((file) => (
          <Col key={file.id} xs={24} sm={12} md={8} lg={6} xl={4} >
            <FileCard data={[file]} />
          </Col>
        ))}
      </Row>
    )}
  </div>
  );
}

export default DashBoard;
