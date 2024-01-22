import React, { useState } from "react";
import useQuery from "./useQuery";
import { authService } from "../services/authService";

const useAddress = (defaultValue) => {
  const [provinceId, setProvinceId] = useState(defaultValue?.provinceId);
  const [districtId, setDistrictId] = useState(defaultValue?.districtId);
  const [wardId, setWardId] = useState(defaultValue?.wardId);

  const { data: provinceData } = useQuery(authService.getDataProvince);

  const { data: districtData } = useQuery(
    () => provinceId && authService.getDataDistrict(provinceId),
    [provinceId]
  );
  const { data: wardData } = useQuery(() => {
    return districtId && authService.getDataWard(districtId);
  }, [districtId]);

  const handleProvinceChange = (changeId) => {
    setProvinceId(changeId);
    setDistrictId(undefined);
    setWardId(undefined);
  };
  const handleDistricChange = (changeId) => {
    setDistrictId(changeId);
    setWardId(undefined);
  };
  const handleWardChange = (changeId) => {
    setWardId(changeId);
  };

  return {
    provinces:
      provinceData?.provinces?.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }) || [],
    districts:
      districtData?.districts?.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }) || [],
    wards:
      wardData?.wards?.map((item) => {
        return {
          value: item.id,
          label: item.name,
        };
      }) || [],
    provinceId,
    districtId,
    wardId,
    handleDistricChange,
    handleProvinceChange,
    handleWardChange,
  };
};

export default useAddress;
