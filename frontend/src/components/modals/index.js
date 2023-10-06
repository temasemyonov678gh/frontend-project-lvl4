import Add from './Add';
import Remove from './Remove';
import Rename from './Rename';

const modals = {
  adding: Add,
  renaming: Rename,
  removing: Remove,
};

const getModal = (modalName) => modals[modalName];

export default getModal;
