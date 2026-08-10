(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/graphql/organizations.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/auth-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nhost.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    isLoading: true,
    isAuthenticated: false,
    user: null,
    session: null
});
function AuthProvider({ children }) {
    _s();
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [session, setSession] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            // Initial read — session storage is populated synchronously on
            // client init if a session was already persisted (e.g. page refresh).
            setSession(__TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].getUserSession());
            setIsLoading(false);
            const unsubscribe = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].sessionStorage.onChange({
                "AuthProvider.useEffect.unsubscribe": (newSession)=>{
                    setSession(newSession);
                }
            }["AuthProvider.useEffect.unsubscribe"]);
            return unsubscribe;
        }
    }["AuthProvider.useEffect"], []);
    const value = {
        isLoading,
        isAuthenticated: !!session,
        user: session?.user ?? null,
        session
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/auth-context.tsx",
        lineNumber: 69,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "lwHVvHPLq24Ozw9mcpSeKLDLBlI=");
_c = AuthProvider;
function useAuth() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
}
_s1(useAuth, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/nhost.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "nhost",
    ()=>nhost
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$nhost$2f$nhost$2d$js$2f$dist$2f$nhost$2d$js$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@nhost/nhost-js/dist/nhost-js.js [app-client] (ecmascript)");
;
const nhost = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$nhost$2f$nhost$2d$js$2f$dist$2f$nhost$2d$js$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createClient"])({
    subdomain: ("TURBOPACK compile-time value", "rlixouktdanijepxxoqm") ?? "",
    region: ("TURBOPACK compile-time value", "ap-south-1") ?? ""
});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/org-context.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "OrgProvider",
    ()=>OrgProvider,
    "useOrg",
    ()=>useOrg
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nhost.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$organizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/graphql/organizations.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const STORAGE_KEY = "aiwb:currentOrgId";
const OrgContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])({
    isLoading: true,
    organizations: [],
    currentOrgId: null,
    currentOrg: null,
    setCurrentOrgId: ()=>{},
    refetch: async ()=>{}
});
function OrgProvider({ children }) {
    _s();
    const { isAuthenticated, user } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"])();
    const [organizations, setOrganizations] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentOrgId, setCurrentOrgIdState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const fetchOrgs = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OrgProvider.useCallback[fetchOrgs]": async ()=>{
            if (!isAuthenticated || !user) {
                setOrganizations([]);
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                    query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$organizations$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MY_ORGANIZATIONS_QUERY"],
                    variables: {
                        userId: user.id
                    }
                });
                const rows = response.body.data?.organizations ?? [];
                const summaries = rows.filter({
                    "OrgProvider.useCallback[fetchOrgs].summaries": (row)=>row.members.length > 0
                }["OrgProvider.useCallback[fetchOrgs].summaries"]).map({
                    "OrgProvider.useCallback[fetchOrgs].summaries": (row)=>({
                            id: row.id,
                            name: row.name,
                            quotaAllowed: row.quota_allowed,
                            quotaUsed: row.quota_used,
                            myRole: row.members[0].role
                        })
                }["OrgProvider.useCallback[fetchOrgs].summaries"]);
                setOrganizations(summaries);
                // Keep the selected org valid: restore from storage if it's still
                // one of the user's orgs, otherwise fall back to the first one.
                const stored = ("TURBOPACK compile-time truthy", 1) ? window.localStorage.getItem(STORAGE_KEY) : "TURBOPACK unreachable";
                const stillValid = summaries.some({
                    "OrgProvider.useCallback[fetchOrgs].stillValid": (o)=>o.id === stored
                }["OrgProvider.useCallback[fetchOrgs].stillValid"]);
                const nextId = stillValid ? stored : summaries[0]?.id ?? null;
                setCurrentOrgIdState(nextId);
                if (nextId && ("TURBOPACK compile-time value", "object") !== "undefined") {
                    window.localStorage.setItem(STORAGE_KEY, nextId);
                }
            } catch (err) {
                console.error("Could not load organizations:", err);
            } finally{
                setIsLoading(false);
            }
        }
    }["OrgProvider.useCallback[fetchOrgs]"], [
        isAuthenticated,
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "OrgProvider.useEffect": ()=>{
            fetchOrgs();
        }
    }["OrgProvider.useEffect"], [
        fetchOrgs
    ]);
    const setCurrentOrgId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "OrgProvider.useCallback[setCurrentOrgId]": (id)=>{
            setCurrentOrgIdState(id);
            if ("TURBOPACK compile-time truthy", 1) {
                window.localStorage.setItem(STORAGE_KEY, id);
            }
        }
    }["OrgProvider.useCallback[setCurrentOrgId]"], []);
    const currentOrg = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "OrgProvider.useMemo[currentOrg]": ()=>organizations.find({
                "OrgProvider.useMemo[currentOrg]": (o)=>o.id === currentOrgId
            }["OrgProvider.useMemo[currentOrg]"]) ?? null
    }["OrgProvider.useMemo[currentOrg]"], [
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(OrgContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/lib/org-context.tsx",
        lineNumber: 117,
        columnNumber: 10
    }, this);
}
_s(OrgProvider, "qnjQN0j0bnRudE+NgcgmVqiKqm0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAuth"]
    ];
});
_c = OrgProvider;
function useOrg() {
    _s1();
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(OrgContext);
}
_s1(useOrg, "gDsCjeeItUuvgOWf1v4qoK9RF6k=");
var _c;
__turbopack_context__.k.register(_c, "OrgProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_211-lvt._.js.map