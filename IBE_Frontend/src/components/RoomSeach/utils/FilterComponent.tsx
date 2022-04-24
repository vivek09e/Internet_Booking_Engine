import { Box, Card, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import "../../../Internationalization.tsx";
import { useTranslation } from "react-i18next";
import { RootState } from "../../../redux/reduxStore";
import BedTypeFilter from "./BedTypeFilter";
import RoomTypeFilter from "./RoomTypeFilter";

const FilterComponent = () => {
  const tenanatFilters = useSelector(
    (state: RootState) => state.tenantfilterReducer
  );
  const { t } = useTranslation();
  return (
    <Card className="filter-component">
      <Box className="data">
        <Box className="heading">
          <Typography variant="h5">{t("Narrow your Result")}</Typography>
        </Box>
        <Box>
          <RoomTypeFilter flag={tenanatFilters.RoomTypeFilterFk} />
        </Box>
        <Box>
          <BedTypeFilter flag={tenanatFilters.BedTypeFilter} />
        </Box>
      </Box>
    </Card>
  );
};

export default FilterComponent;
