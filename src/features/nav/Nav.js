import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import BookIcon from '@mui/icons-material/Book';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import EditNoteIcon from '@mui/icons-material/EditNote';
import EmailIcon from '@mui/icons-material/Email';
import ExtensionIcon from '@mui/icons-material/Extension';
import GradientIcon from '@mui/icons-material/Gradient';
import InboxIcon from '@mui/icons-material/Inbox';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import LanguageIcon from '@mui/icons-material/Language';
import PersonIcon from '@mui/icons-material/Person';
import PsychologyIcon from '@mui/icons-material/Psychology';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import SpellcheckIcon from '@mui/icons-material/Spellcheck';
import StorageIcon from '@mui/icons-material/Storage';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Button, ButtonGroup, Divider, Menu, MenuItem, useMediaQuery } from '@mui/material';
import Wording from 'common/Wording';
import AnalysisBoard from 'features/nav/AnalysisBoard';
import * as navConst from 'features/nav/navConst';
import * as nav from 'features/nav/navSlice';
import * as warningAlert from 'features/alert/warningAlertSlice';
import * as sanMode from 'features/mode/sanModeSlice';
import * as ravMode from 'features/mode/ravModeSlice';
import * as playMode from 'features/mode/playModeSlice';
import * as stockfishMode from 'features/mode/stockfishModeSlice';
import Ws from 'features/ws/Ws';
import * as progressDialog from 'features/progressDialogSlice';

const Nav = () => {
  const state = useSelector(state => state);

  const dispatch = useDispatch();

  const maxWidth = {
    '900': useMediaQuery("(max-width:900px)"),
  };

  const [anchorElPlay, setAnchorElPlay] = useState(null);

  const [anchorElDatabase, setAnchorElDatabase] = useState(null);

  const [anchorElTraining, setAnchorElTraining] = useState(null);

  const [anchorElOpeningSearch, setAnchorElOpeningSearch] = useState(null);

  const [anchorElInbox, setAnchorElInbox] = useState(null);

  const [hamburgerMenuOpen, setHamburgerMenu] = useState(false)

  const handleHamburgerClick = () => {
    setHamburgerMenu(!hamburgerMenuOpen);
  }

  const handleClosePlay = () => {
    setAnchorElPlay(null);
  };

  const handleCloseDatabase = () => {
    setAnchorElDatabase(null);
  };

  const handleCloseTraining = () => {
    setAnchorElTraining(null);
  };

  const handleCloseOpeningSearch = () => {
    setAnchorElOpeningSearch(null);
  };

  const handleCloseInbox = () => {
    setAnchorElInbox(null);
  };

  const handleClickPlay = (event) => {
    setAnchorElPlay(event.currentTarget);
  };

  const handleClickDatabase = (event) => {
    setAnchorElDatabase(event.currentTarget);
  };

  const handleClickTraining = (event) => {
    setAnchorElTraining(event.currentTarget);
  };

  const handleClickOpeningSearch = (event) => {
    setAnchorElOpeningSearch(event.currentTarget);
  };

  const handleClickInbox = (event) => {
    setAnchorElInbox(event.currentTarget);
  };

  const disabled = state.playMode.active &&
    state.playMode.accepted &&
    (!state.playMode.draw || state.playMode.draw === Wording.verb.PROPOSE.toLowerCase()) &&
    !state.playMode.resign &&
    !state.playMode.leave &&
    !state.playMode.timeOut &&
    !state.board.isMate &&
    !state.board.isStalemate;

  return (
    <>
      <Button sx={{ display: `${maxWidth['900'] ? "block" : "none"}` }}
        onClick={handleHamburgerClick} > {hamburgerMenuOpen ? <CloseIcon sx={{fontSize: 40}} /> : <MenuIcon sx={{fontSize: 40}} />}
      </Button>
      <ButtonGroup
        orientation={maxWidth['900'] ? "vertical" : "horizontal"}
        variant="text"
        aria-label="Main Menu"
        fullWidth={true}
        disabled={disabled}
        sx={{
          borderTop: "1px solid #1976d280",
          borderBottom: "1px solid #1976d280",
          borderRadius: 0,
          display: `${maxWidth['900'] ? (hamburgerMenuOpen ? "flex" : "none") : "flex"}`
        }}
      >
        <AnalysisBoard />
        <Button
          id="Nav-play"
          variant={state.nav.name === navConst.PLAY ? "contained" : "text"}
          startIcon={<GradientIcon />}
          onClick={handleClickPlay}
        >
          Play
        </Button>
        <Menu
          anchorEl={anchorElPlay}
          open={Boolean(anchorElPlay)}
          onClose={handleClosePlay}
        >
          <MenuItem
            id="Nav-play-MenuItem-computer"
            onClick={() => {
              dispatch(stockfishMode.playComputerDialog({ open: true }));
              handleClosePlay();
            }}
          >
            <SmartToyIcon size="small" />&nbsp;Play Computer
          </MenuItem>
          <Divider />
          <MenuItem
            id="Nav-play-MenuItem-friend"
            onClick={() => {
              dispatch(playMode.set({ play: {} }));
              dispatch(playMode.createInviteCodeDialog({ open: true }));
              handleClosePlay();
            }}
          >
            <PersonIcon size="small" />&nbsp;Play a Friend
          </MenuItem>
          <MenuItem
            id="Nav-play-MenuItem-enter-invite-code"
            onClick={() => {
              dispatch(playMode.enterInviteCodeDialog({ open: true }));
              handleClosePlay();
            }}
          >
            <KeyboardIcon size="small" />&nbsp;Enter Invite Code
          </MenuItem>
          <Divider />
          <MenuItem
            id="Nav-play-MenuItem-online"
            onClick={() => {
              Ws.onlineGames();
              dispatch(playMode.playOnlineDialog({ open: true }));
              handleClosePlay();
            }}
          >
            <LanguageIcon size="small" />&nbsp;Play Online
          </MenuItem>
        </Menu>
        <Button
          id="Nav-openingSearch"
          variant={state.nav.name === navConst.OPENING_SEARCH ? "contained" : "text"}
          startIcon={<SearchIcon />}
          onClick={handleClickOpeningSearch}
        >
          Opening Search
        </Button>
        <Menu
          anchorEl={anchorElOpeningSearch}
          open={Boolean(anchorElOpeningSearch)}
          onClose={handleCloseOpeningSearch}
        >
          <MenuItem
            id="Nav-openingSearch-MenuItem-ecoCode"
            onClick={() => {
              dispatch(sanMode.searchEcoDialog({ open: true }));
              handleCloseOpeningSearch();
            }}
          >
            <BookIcon size="small" />&nbsp;ECO Code
          </MenuItem>
          <MenuItem
            id="Nav-openingSearch-MenuItem-sanMovetext"
            onClick={() => {
              dispatch(sanMode.searchMovetextDialog({ open: true }));
              handleCloseOpeningSearch();
            }
            }>
            <MoveDownIcon size="small" />&nbsp;SAN Movetext
          </MenuItem>
          <MenuItem
            id="Nav-openingSearch-MenuItem-name"
            onClick={() => {
              dispatch(sanMode.searchNameDialog({ open: true }));
              handleCloseOpeningSearch();
            }}
          >
            <SpellcheckIcon size="small" />&nbsp;Name
          </MenuItem>
        </Menu>
        <Button
          id="Nav-database"
          variant={state.nav.name === navConst.DATABASE ? "contained" : "text"}
          startIcon={<StorageIcon />}
          onClick={handleClickDatabase}
        >
          Database
        </Button>
        <Menu
          anchorEl={anchorElDatabase}
          open={Boolean(anchorElDatabase)}
          onClose={handleCloseDatabase}
        >
          <MenuItem
            id="Nav-database-MenuItem-searchGames"
            onClick={() => {
              dispatch(sanMode.searchGamesDialog({ open: true }));
              handleCloseDatabase();
            }}
          >
            <TravelExploreIcon size="small" />&nbsp;Search Games
          </MenuItem>
          <Divider />
          <MenuItem
            id="Nav-database-MenuItem-topOpenings"
            onClick={() => {
              dispatch(progressDialog.open());
              fetch(`https://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/stats/opening`)
                .then(res => {
                  if (res.status === 200) {
                    res.json().then(data => {
                      dispatch(nav.openingsStatsDialog({ open: true, stats: data }));
                    });
                  } else {
                    dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
                  }
                })
                .finally(() => {
                  dispatch(progressDialog.close());
                  dispatch(nav.openingsStatsDialog({ open: true }));
                  handleCloseDatabase();
                });
            }}
          >
            <AutoGraphIcon size="small" />&nbsp;Top 50 Openings
          </MenuItem>
          <MenuItem
            id="Nav-database-MenuItem-playersStats"
            onClick={() => {
              dispatch(nav.playersStatsDialog({ open: true }));
              handleCloseDatabase();
            }}
          >
            <QueryStatsIcon size="small" />&nbsp;Players Stats
          </MenuItem>
          <MenuItem
            id="Nav-database-MenuItem-eventsStats"
            onClick={() => {
              dispatch(nav.eventsStatsDialog({ open: true }));
              handleCloseDatabase();
            }}
          >
            <TroubleshootIcon size="small" />&nbsp;Events Stats
          </MenuItem>
          <Divider />
          <MenuItem
            id="Nav-database-MenuItem-searchGames"
            onClick={() => {
              dispatch(progressDialog.open());
              fetch(`https://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}/api/annotations/games`)
                .then(res => res.json())
                .then(res => {
                  dispatch(ravMode.annotatedGamesDialog({ open: true }));
                  dispatch(ravMode.annotatedGamesTable(res.games));
                })
                .catch(error => {
                  dispatch(warningAlert.show({ mssg: 'Whoops! Something went wrong, please try again.' }));
                })
                .finally(() => {
                  dispatch(progressDialog.close());
                  handleCloseDatabase();
                });
            }}
          >
            <EditNoteIcon size="small" />&nbsp;Annotated Games
          </MenuItem>
        </Menu>
        <Button
          id="Nav-training"
          variant={state.nav.name === navConst.TRAINING ? "contained" : "text"}
          startIcon={<PsychologyIcon />}
          onClick={handleClickTraining}
        >
          Training
        </Button>
        <Menu
          anchorEl={anchorElTraining}
          open={Boolean(anchorElTraining)}
          onClose={handleCloseTraining}
        >
          <MenuItem
            id="Nav-training-MenuItem-endgameSkills"
            onClick={() => {
              dispatch(stockfishMode.endgameSkillsDialog({ open: true }));
              handleCloseTraining();
            }}
          >
            <ExtensionIcon size="small" />&nbsp;Endgame Skills
          </MenuItem>
          <MenuItem
            id="Nav-training-MenuItem-checkmateSkills"
            onClick={() => {
              dispatch(stockfishMode.checkmateSkillsDialog({ open: true }));
              handleCloseTraining();
            }}
          >
            <CheckBoxIcon size="small" />&nbsp;Checkmate Skills
          </MenuItem>
        </Menu>
        <Button
          id="Nav-inbox"
          variant={state.nav.name === navConst.INBOX ? "contained" : "text"}
          startIcon={<EmailIcon />}
          onClick={handleClickInbox}
        >
          Inbox
        </Button>
        <Menu
          anchorEl={anchorElInbox}
          open={Boolean(anchorElInbox)}
          onClose={handleCloseInbox}
        >
          <MenuItem
            id="Nav-inbox-MenuItem-inviteFriend"
            onClick={() => {
              dispatch(nav.createInboxCodeDialog({ open: true }));
              handleCloseInbox();
            }}
          >
            <ContactMailIcon size="small" />&nbsp;Create Inbox
          </MenuItem>
          <MenuItem
            id="Nav-training-MenuItem-endgameSkills"
            onClick={() => {
              dispatch(nav.enterInboxCodeDialog({ open: true }));
              handleCloseInbox();
            }}
          >
            <InboxIcon size="small" />&nbsp;Read Inbox
          </MenuItem>
        </Menu>
        <Button
          id="Nav-settings"
          sx={{ borderRadius: 0 }}
          variant={state.nav.name === navConst.SETTINGS ? "contained" : "text"}
          startIcon={<SettingsIcon />}
          onClick={() => dispatch(nav.settingsDialog({ open: true }))}
        >
          Settings
        </Button>
      </ButtonGroup>
    </>
  );
}

export default Nav;
