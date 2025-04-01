import apiInstance from "./apiInstance.js"; // Ensure you have a declaration file for this module

const getDashBoardCotent = async (): Promise<{ active: number; hours: number; revenue: number } | any> => {
    await apiInstance
        .get("/dashboard")
        .then((data: any) => {
            if (data?.data) {
                const dashCont = {
                    active: data?.activeCnt,
                    hours: data?.hours,
                    revenue: data?.revenue,
                };
                return dashCont;
            }
        })
        .catch((err: any) => {
            return err.response.data;
        });
};

const getActiveSession = async () => {
    await apiInstance
        .get("/active")
        .then((data) => {
            if (data?.data) {
                return data;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

const getAllUser = async () => {
    await apiInstance
        .get("/user")
        .then((data) => {
            if (data?.data) {
                return true;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

const resumeSession = async (userHash: string): Promise<boolean | any> => {
    await apiInstance
        .post("/resume", {
            userHash: userHash,
        })
        .then((data) => {
            if (data?.data) {
                return true;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

const revokeSession = async (userHash: string): Promise<boolean | any> => {
    await apiInstance
        .post("/revokeSession", {
            userHash,
        })
        .then((data) => {
            if (data?.data) {
                return true;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

const addUser = async (userHash: string, userName: string, userPhone: string): Promise<boolean | any> => {
    await apiInstance
        .post("/addUser", {
            userName: userName,
            phoneNumber: userPhone,
            userHash: userHash,
        })
        .then((data) => {
            if (data?.data) {
                return true;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

const rechargeUser = async (userHash: string, amt: number): Promise<boolean | any> => {
    await apiInstance
        .post("/recharge", {
            userHash: userHash,
            rechargeAmount: amt,
        })
        .then((data) => {
            if (data?.data) {
                return true;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

const addNewPlan = async (hrs: number, val: number): Promise<boolean | any> => {
    await apiInstance
        .post("/addPlan", {
            hours: hrs,
            validity: val,
        })
        .then((data) => {
            if (data?.data) {
                return true;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

const removePlan = async (id: string): Promise<boolean | any> => {
    await apiInstance
        .post("/removePlan", {
            id: id,
        })
        .then((data) => {
            if (data?.data) {
                return true;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

const usageLog = async () => {
    await apiInstance
        .get("/usage")
        .then((data) => {
            if (data?.data) {
                return data;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

const getBillDetails = async () => {
    await apiInstance
        .get("/bill-details")
        .then((data) => {
            if (data?.data) {
                return data;
            }
        })
        .catch((err) => {
            return err.response.data;
        });
};

export {
    getDashBoardCotent,
    getActiveSession,
    getAllUser,
    resumeSession,
    revokeSession,
    addUser,
    rechargeUser,
    addNewPlan,
    removePlan,
    usageLog,
    getBillDetails,
};
