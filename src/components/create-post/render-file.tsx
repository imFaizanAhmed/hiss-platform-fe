import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { CustomTooltip } from "../../lib/tooltip";
import { FileDisplayProps } from "./types";

interface RenderFileProps extends FileDisplayProps {
  setFile: (t: FileDisplayProps) => void;
}

const RenderFile = ({ fileType, fileUrl, setFile }: RenderFileProps) => {
  const RemoveMedia = ({
    handleRemove,
    top = 2,
    right = 2,
    color = 'black'
  }: {
    handleRemove: () => void;
    top?: string | number;
    right?: string | number;
    color?: string;
  }) => (
    <CustomTooltip tooltipText="Remove Media">
      <FontAwesomeIcon
        icon={faCircleXmark}
        style={{ top, right }}
        color={color}
        className={`mr-4 h-5 cursor-pointer absolute`}
        onClick={handleRemove}
      />
    </CustomTooltip>
  );
  const handleRemoveMedia = () => {
    setFile({
      fileType: "",
      fileUrl: "",
      file: null,
    });
  };

  const DisplayImage: React.FC<FileDisplayProps> = ({ fileUrl }) => {
    return (
      <div className="relative h-[200px] border-cyan-50">
        <img
          src={fileUrl}
          alt="Uploaded"
          style={{
            width: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            border: "0.5px solid black",
            padding: 4,
            borderRadius: 8,
          }}
        />
        <RemoveMedia handleRemove={handleRemoveMedia} />
      </div>
    );
  };

  const DisplayVideo: React.FC<FileDisplayProps> = ({ fileUrl }) => {
    return (
      <div className="relative h-[200px] border-cyan-50">
        <video
          controls
          style={{ width: "100%", maxHeight: "400px", padding: 4 }}
        >
          <source src={fileUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <RemoveMedia handleRemove={handleRemoveMedia} />
      </div>
    );
  };

  const DisplayPDF: React.FC<FileDisplayProps> = ({ fileUrl }) => {
    return (
      <div className="relative border">
        <iframe
          src={fileUrl}
          height={400}
          width="100%"
          allowFullScreen // Optional: if you want to allow fullscreen (note the camelCase in React)
          title="My iframe" // Recommended: for accessibility reasons
        ></iframe>
        <RemoveMedia handleRemove={handleRemoveMedia} top={17} right={112} color={'white'} />
      </div>
    );
  };

  switch (fileType) {
    case "image":
      return <DisplayImage fileUrl={fileUrl} />;
    case "video":
      return <DisplayVideo fileUrl={fileUrl} />;
    case "pdf":
      return <DisplayPDF fileUrl={fileUrl} />;
    default:
      return null;
  }
};

export default RenderFile;
