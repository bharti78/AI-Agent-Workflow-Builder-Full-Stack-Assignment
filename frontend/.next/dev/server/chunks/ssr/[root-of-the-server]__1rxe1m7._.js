module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[project]/graphql/organizations.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MY_ORGANIZATIONS_QUERY",
    ()=>MY_ORGANIZATIONS_QUERY,
    "REMOVE_MEMBER_MUTATION",
    ()=>REMOVE_MEMBER_MUTATION,
    "UPDATE_MEMBER_ROLE_MUTATION",
    ()=>UPDATE_MEMBER_ROLE_MUTATION
]);
const MY_ORGANIZATIONS_QUERY = `
  query MyOrganizations($userId: uuid!) {
    organizations(order_by: { created_at: asc }) {
      id
      name
      quota_allowed
      quota_used
      members(where: { user_id: { _eq: $userId } }) {
        role
      }
    }
  }
`;
const UPDATE_MEMBER_ROLE_MUTATION = `
  mutation UpdateMemberRole($memberId: uuid!, $role: String!) {
    update_org_members_by_pk(pk_columns: { id: $memberId }, _set: { role: $role }) {
      id
      role
    }
  }
`;
const REMOVE_MEMBER_MUTATION = `
  mutation RemoveMember($memberId: uuid!) {
    delete_org_members_by_pk(id: $memberId) {
      id
    }
  }
`;
}),
"[project]/lib/auth-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nhost.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    session: null
});
function AuthProvider({ children }) {
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Initial read — session storage is populated synchronously on
        // client init if a session was already persisted (e.g. page refresh).
        setSession(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nhost"].getUserSession());
        setIsLoading(false);
        const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nhost"].sessionStorage.onChange((newSession)=>{
            setSession(newSession);
        });
        return unsubscribe;
    }, []);
    const value = {
        isLoading,
        isAuthenticated: !!session,
        user: session?.user ?? null,
        session
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 69,
        columnNumber: 10
    }, this);
}
function useAuth() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
}
}),
"[project]/lib/nhost.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nhost",
    ()=>nhost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$nhost$2f$nhost$2d$js$2f$dist$2f$nhost$2d$js$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@nhost/nhost-js/dist/nhost-js.js [app-ssr] (ecmascript)");
;
const nhost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$nhost$2f$nhost$2d$js$2f$dist$2f$nhost$2d$js$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createClient"])({
    subdomain: ("TURBOPACK compile-time value", "rlixouktdanijepxxoqm") ?? "",
    region: ("TURBOPACK compile-time value", "ap-south-1") ?? ""
});
}),
"[project]/lib/org-context.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrgProvider",
    ()=>OrgProvider,
    "useOrg",
    ()=>useOrg
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nhost.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-context.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$organizations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/graphql/organizations.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
const STORAGE_KEY = "aiwb:currentOrgId";
const OrgContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    isLoading: true,
    organizations: [],
    currentOrgId: null,
    currentOrg: null,
    setCurrentOrgId: ()=>{},
    refetch: async ()=>{}
});
function OrgProvider({ children }) {
    const { isAuthenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useAuth"])();
    const [organizations, setOrganizations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentOrgId, setCurrentOrgIdState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const fetchOrgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        if (!isAuthenticated || !user) {
            setOrganizations([]);
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$organizations$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MY_ORGANIZATIONS_QUERY"],
                variables: {
                    userId: user.id
                }
            });
            const rows = response.body.data?.organizations ?? [];
            const summaries = rows.filter((row)=>row.members.length > 0).map((row)=>({
                    id: row.id,
                    name: row.name,
                    quotaAllowed: row.quota_allowed,
                    quotaUsed: row.quota_used,
                    myRole: row.members[0].role
                }));
            setOrganizations(summaries);
            // Keep the selected org valid: restore from storage if it's still
            // one of the user's orgs, otherwise fall back to the first one.
            const stored = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
            const stillValid = summaries.some((o)=>o.id === stored);
            const nextId = stillValid ? stored : summaries[0]?.id ?? null;
            setCurrentOrgIdState(nextId);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } finally{
            setIsLoading(false);
        }
    }, [
        isAuthenticated,
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchOrgs();
    }, [
        fetchOrgs
    ]);
    const setCurrentOrgId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((id)=>{
        setCurrentOrgIdState(id);
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    const currentOrg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>organizations.find((o)=>o.id === currentOrgId) ?? null, [
        organizations,
        currentOrgId
    ]);
    const value = {
        isLoading,
        organizations,
        currentOrgId,
        currentOrg,
        setCurrentOrgId,
        refetch: fetchOrgs
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(OrgContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/org-context.tsx",
        lineNumber: 115,
        columnNumber: 10
    }, this);
}
function useOrg() {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(OrgContext);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1rxe1m7._.js.map