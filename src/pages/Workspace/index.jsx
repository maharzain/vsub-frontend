import { Link, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Notice from "../../components/Notice";
import CategoryCard from "../../components/CategoryCard";
import searchIcon from "../../assets/images/searchIcon.svg";
import noData from "../../assets/images/noData.svg";
import { categoryCardInformation } from "../../constants";
import Modal from "../../components/Modal";
import { useState, useEffect } from "react";
import Button from "../../components/Button";
import BorderBox from "../../components/BorderBox";
import BorderButton from "../../components/BorderButton";
import FilledButton from "../../components/FilledButton";
import { IconFolderPlus } from "@tabler/icons-react";
import axios from "../../constants/api.js";

const Workspace = () => {
  const [showModal, setShowModal] = useState(false);
  const [workspaces, setWorkspaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        setLoading(true);
        const response = await axios.get('/workspaces');
        if (response.data.success) {
          setWorkspaces(response.data.data);
        } else {
          setError('Failed to fetch workspaces');
        }
      } catch (err) {
        console.error('Error fetching workspaces:', err);
        setError('Failed to fetch workspaces');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleViewVideo = (workspaceId) => {
    navigate(`/workspace/editor/${workspaceId}`);
  };
  return (
    <Container>
      <div className='py-14'>
        <div className='flex flex-col sm:flex-row items-center gap-10 sm:gap-0'>
          <div className='w-[100%] sm:w-[50%] flex flex-col gap-3'>
            <h3 className='text-md font-bold text-dimGray-2'>
              Let's create some videos!
            </h3>
            <div className='flex flex-row gap-4 items-center'>
              <div
                style={{ borderRadius: "0.25rem", borderWidth: "0.5px" }}
                className='px-[6px] py-[1px] bg-nightBlue border-solid border-glowBlue text-glowBlue text-[0.8rem]'
              >
                Starter
              </div>
              <div
                style={{ borderRadius: "0.25rem", borderWidth: "0.5px" }}
                className='px-[6px] py-[1px] bg-purpleGray border-solid border-gray-700 text-dimGray-2 text-[0.8rem]'
              >
                Renewal Date: 03/09/2024
              </div>
            </div>
            <div className='flex flex-row gap-4 items-center'>
              <div
                style={{ borderRadius: "0.25rem", borderWidth: "0.5px" }}
                className='px-[6px] py-[1px] bg-darkGreen border-solid border-teal text-teal text-[0.8rem]'
              >
                6000 credits
              </div>
              <Link
                to='#'
                className='text-sm text-glowBlue hover:text-blue-400'
              >
                View History
              </Link>
            </div>
            <div>
              <button className='btn btn-sm bg-darkIndigo hover:bg-accentIndigo text-dimGray rounded-md font-normal'>
                Top up
              </button>
            </div>
          </div>
          <div className='w-[100%] sm:w-[50%] flex flex-col gap-3'>
            <Notice bg={"bg-darkBlue"} borderColor={"border-borderBlue"}>
              <span style={{ fontSize: "0.9rem" }}>
                💸 Earn money for life with{" "}
                <Link
                  to='#'
                  className='text-sm text-glowBlue hover:text-blue-400'
                >
                  Vsub affiliate program
                </Link>
              </span>
            </Notice>
            <Notice bg={"bg-darkBlue"} borderColor={"border-borderBlue"}>
              <span style={{ fontSize: "0.9rem" }}>
                🛍️ Buy{" "}
                <a
                  href='#'
                  className='text-sm text-glowBlue hover:text-blue-400'
                >
                  monetized TikTok accounts
                </a>{" "}
                (use code ETHAN for 😘)
              </span>
            </Notice>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8'>
          {categoryCardInformation.map((category, index) => (
            <Link key={category.title} to={`/workspace/${category.title}`}>
              <CategoryCard
                title={category.title}
                image={category.image}
                heading={category.heading}
                subHeading={category.subHeading}
                newNiche={category.newNiche}
                bestNiche={category.bestNiche}
                onClick={openModal}
              />
            </Link>
          ))}
        </div>
      </div>
      <p className='text-white'>My Files</p>
      <div className='flex flex-col gap-3 justify-between mt-4 pb-6 sm:flex-row sm:gap-0'>
        <Button input={true} image={searchIcon} />
        {/* new folder btn */}
        <BorderButton onClick={openModal}>
          <IconFolderPlus size={20} />
          New Folder
        </BorderButton>
      </div>
      {/* New Folder PopUp Modal */}
      <Modal show={showModal} handleClose={closeModal}>
        <div className='mt-4'>
          <p className='mb-3 text-primary-font'>Folder Name</p>
          <Button input={true} inputId='folderName' />
        </div>
        <div className='flex justify-end mt-6 gap-2'>
          <BorderButton onClick={closeModal}>Cancel</BorderButton>
          {/* <BorderButton>Create Folder</BorderButton> */}
          <FilledButton size='1.9rem'>Create Folder</FilledButton>
        </div>
      </Modal>

      <BorderBox>
        <ul className='flex justify-between text-primary-font bg-lightPurple mt-6 px-2 sm:px-10 py-4 rounded-md'>
          <li className='border-l-2 border-tableBorder pl-2 sm:ml-10'>Name</li>
          <li className='border-l-2 border-tableBorder pl-2'>Status</li>
          <li className='border-l-2 border-tableBorder pl-2'>
            Created
          </li>
          <li className='border-l-2 border-tableBorder pl-2 sm:mr-20'>
            Actions
          </li>
        </ul>

        {loading ? (
          <div className='py-12 flex items-center justify-center'>
            <p className='text-primary-font'>Loading...</p>
          </div>
        ) : error ? (
          <div className='py-12 flex items-center justify-center'>
            <p className='text-red-400'>{error}</p>
          </div>
        ) : workspaces.length === 0 ? (
          <div className='py-12 flex items-center justify-center'>
            <div>
              <img src={noData} alt='no data' />
              <p className='mt-3 text-primary-font'>No Data</p>
            </div>
          </div>
        ) : (
          <div className='mt-4'>
            {workspaces.map((workspace) => (
              <div key={workspace.id} className='flex justify-between text-primary-font px-2 sm:px-10 py-3 border-b border-gray-700 hover:bg-gray-800'>
                <div className='pl-2 sm:ml-10 truncate flex-1'>
                  <Link to={`/workspace/editor/${workspace.id}`} className='hover:text-glowBlue'>
                    {workspace.name}
                  </Link>
                </div>
                <div className='pl-2 flex-1 text-center'>
                  <span className={`px-2 py-1 rounded text-xs ${workspace.status === 'Completed' ? 'bg-green-800 text-green-200' : 'bg-yellow-800 text-yellow-200'}`}>
                    {workspace.status}
                  </span>
                </div>
                <div className='pl-2 flex-1 text-center'>
                  {formatDate(workspace.created)}
                </div>
                <div className='pl-2 sm:mr-20 flex-1 text-right'>
                  <button 
                    onClick={() => handleViewVideo(workspace.id)}
                    className='px-3 py-1 bg-glowBlue hover:bg-blue-600 text-white rounded text-xs font-medium transition-colors'
                  >
                    View Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </BorderBox>
      <div className='pb-32' />
    </Container>
  );
};

export default Workspace;
