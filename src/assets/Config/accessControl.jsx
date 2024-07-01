import { generalFunction } from "./generalFunction";
import { mainConfig } from "./appConfig";

const fetchUserPermission = async () => {
    const UserId = localStorage.getItem("varaUserId");
    return await generalFunction.fetchUserPermissionRole(UserId);
};

export const userPermissions = {

    canUserEdit: () => {
        const UserPermission = fetchUserPermission();
        if (UserPermission !== 'ADMIN' && UserPermission !== 'OWNER') {
            return false;
        }
        return true;
    },

    canUserAdd: () => {
        const UserPermission = fetchUserPermission();
        if (UserPermission !== 'ADMIN' && UserPermission !== 'OWNER') {
            return false;
        }
        return true;
    },

    canUserDelete: () => {
        const UserPermission = fetchUserPermission();
        if (UserPermission !== 'ADMIN' && UserPermission !== 'OWNER') {
            return false;
        }
        return true;
    },

    hasUserPermissions: async (page) => {
        try {
            const UserPermission = await fetchUserPermission();
            console.log(page);
            if (!UserPermission || !UserPermission[0] || !UserPermission[0].role) {
                console.log('false');
                return false;
            }

            const role = UserPermission[0].role;

            if (role === 'FIELD MANAGER' && page === 'Data Entry') {
                console.log('true');
                return true;
            } else if (role === 'FIELD MANAGER' && page !== 'Data Entry') {
                console.log('false');
                return false;
            } else if (role !== 'FIELD MANAGER' && page === 'Data Entry') {
                console.log('false');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error fetching user permissions:', error);
            console.log('false');
            return false;
        }
    },

    hasUserSettingPermissions: async (page) => {
        try {
            const UserPermission = await fetchUserPermission();
            console.log(page);
            if (!UserPermission || !UserPermission[0] || !UserPermission[0].role) {
                console.log('false');
                return false;
            }

            const role = UserPermission[0].role;

            if (role === 'FIELD MANAGER' && page === 'manage') {
                console.log('false');
                return false;
            } else if (role === 'FIELD MANAGER' && page === 'managefacilities') {
                console.log('false');
                return false;
            } else if (role === 'FIELD MANAGER' && page === 'manageusers') {
                console.log('false');
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error fetching user permissions:', error);
            console.log('false');
            return false;
        }
    }
}
