module.exports=[18622,(a,b,c)=>{b.exports=a.x("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js",()=>require("next/dist/compiled/next-server/app-page-turbo.runtime.prod.js"))},20635,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/action-async-storage.external.js",()=>require("next/dist/server/app-render/action-async-storage.external.js"))},24725,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/after-task-async-storage.external.js",()=>require("next/dist/server/app-render/after-task-async-storage.external.js"))},43285,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/dynamic-access-async-storage.external.js",()=>require("next/dist/server/app-render/dynamic-access-async-storage.external.js"))},56704,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-async-storage.external.js",()=>require("next/dist/server/app-render/work-async-storage.external.js"))},32319,(a,b,c)=>{b.exports=a.x("next/dist/server/app-render/work-unit-async-storage.external.js",()=>require("next/dist/server/app-render/work-unit-async-storage.external.js"))},59043,(a,b,c)=>{b.exports=a.x("next/dist/server/runtime-reacts.external.js",()=>require("next/dist/server/runtime-reacts.external.js"))},21937,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(83905);let e=(0,c.createContext)({isLoading:!0,isAuthenticated:!1,user:null,session:null});a.s(["AuthProvider",0,function({children:a}){let[f,g]=(0,c.useState)(!0),[h,i]=(0,c.useState)(null);(0,c.useEffect)(()=>(i(d.nhost.getUserSession()),g(!1),d.nhost.sessionStorage.onChange(a=>{i(a)})),[]);let j={isLoading:f,isAuthenticated:!!h,user:h?.user??null,session:h};return(0,b.jsx)(e.Provider,{value:j,children:a})},"useAuth",0,function(){return(0,c.useContext)(e)}])},49391,9273,a=>{"use strict";var b=a.i(87924),c=a.i(72131),d=a.i(83905),e=a.i(21937);let f=`
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
`,g=`
  mutation UpdateMemberRole($memberId: uuid!, $role: String!) {
    update_org_members_by_pk(pk_columns: { id: $memberId }, _set: { role: $role }) {
      id
      role
    }
  }
`,h=`
  mutation RemoveMember($memberId: uuid!) {
    delete_org_members_by_pk(id: $memberId) {
      id
    }
  }
`;a.s(["MY_ORGANIZATIONS_QUERY",0,f,"REMOVE_MEMBER_MUTATION",0,h,"UPDATE_MEMBER_ROLE_MUTATION",0,g],9273);let i=(0,c.createContext)({isLoading:!0,organizations:[],currentOrgId:null,currentOrg:null,setCurrentOrgId:()=>{},refetch:async()=>{}});a.s(["OrgProvider",0,function({children:a}){let{isAuthenticated:g,user:h}=(0,e.useAuth)(),[j,k]=(0,c.useState)([]),[l,m]=(0,c.useState)(null),[n,o]=(0,c.useState)(!0),p=(0,c.useCallback)(async()=>{if(!g||!h){k([]),o(!1);return}o(!0);try{let a=await d.nhost.graphql.request({query:f,variables:{userId:h.id}}),b=(a.body.data?.organizations??[]).filter(a=>a.members.length>0).map(a=>({id:a.id,name:a.name,quotaAllowed:a.quota_allowed,quotaUsed:a.quota_used,myRole:a.members[0].role}));k(b);let c=b.some(a=>null===a.id)?null:b[0]?.id??null;m(c)}finally{o(!1)}},[g,h]);(0,c.useEffect)(()=>{p()},[p]);let q=(0,c.useCallback)(a=>{m(a)},[]),r=(0,c.useMemo)(()=>j.find(a=>a.id===l)??null,[j,l]);return(0,b.jsx)(i.Provider,{value:{isLoading:n,organizations:j,currentOrgId:l,currentOrg:r,setCurrentOrgId:q,refetch:p},children:a})},"useOrg",0,function(){return(0,c.useContext)(i)}],49391)},42602,(a,b,c)=>{"use strict";b.exports=a.r(18622)},9270,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.AppRouterContext},36313,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.HooksClientContext},18341,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored.contexts.ServerInsertedHtml},87924,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactJsxRuntime},38783,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].ReactServerDOMTurbopackClient},72131,(a,b,c)=>{"use strict";b.exports=a.r(42602).vendored["react-ssr"].React}];

//# sourceMappingURL=%5Broot-of-the-server%5D__169lpsl._.js.map