(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,84410,e=>{"use strict";var t=e.i(43476),r=e.i(22016),n=e.i(18566),o=e.i(71645),i=e.i(46477),a=e.i(15634),s=e.i(59e3);e.s(["default",0,function(){var e;let l=(0,n.useRouter)(),{currentOrg:u,isLoading:d}=(0,a.useOrg)(),[c,f]=(0,o.useState)([]),[p,g]=(0,o.useState)(!0),[_,h]=(0,o.useState)(!1),[m,y]=(0,o.useState)(""),[w,b]=(0,o.useState)(""),[k,$]=(0,o.useState)(null),j=(0,o.useCallback)(async()=>{if(!u){f([]),g(!1);return}g(!0),$(null);try{let e=await i.nhost.graphql.request({query:s.WORKFLOWS_FOR_ORG_QUERY,variables:{orgId:u.id}});f(e.body.data?.workflows??[])}catch(e){$(e instanceof Error?e.message:"Could not load workflows")}finally{g(!1)}},[u]);async function v(e){if(e.preventDefault(),u){h(!0),$(null);try{let e=await i.nhost.graphql.request({query:s.CREATE_WORKFLOW_MUTATION,variables:{orgId:u.id,name:m.trim(),description:w.trim()||null}}),t=e.body.data?.insert_workflows_one?.id;if(!t)throw Error("Workflow was created but no id was returned");l.push(`/workflows/${t}`)}catch(e){$(e instanceof Error?e.message:"Could not create workflow")}finally{h(!1)}}}async function T(e){try{await i.nhost.graphql.request({query:s.UPDATE_WORKFLOW_MUTATION,variables:{workflowId:e.id,name:e.name,description:e.description,active:!e.active}}),await j()}catch(e){$(e instanceof Error?e.message:"Could not update workflow")}}if((0,o.useEffect)(()=>{j()},[j]),d||p)return(0,t.jsx)("main",{className:"page",children:(0,t.jsx)("p",{className:"muted",children:"Loading..."})});if(!u)return(0,t.jsx)("main",{className:"page",children:(0,t.jsxs)("p",{className:"muted",children:["You're not in an organization yet."," ",(0,t.jsx)(r.default,{href:"/organizations/new",children:"Create one"}),"."]})});let O="owner"===(e=u.myRole)||"editor"===e;return(0,t.jsxs)("main",{className:"page page-wide",children:[(0,t.jsx)("p",{children:(0,t.jsx)(r.default,{href:"/",children:"← Back"})}),(0,t.jsx)("div",{className:"page-heading",children:(0,t.jsxs)("div",{children:[(0,t.jsx)("h1",{children:"Workflows"}),(0,t.jsxs)("p",{className:"muted",children:[u.name," · your role: ",u.myRole]})]})}),k&&(0,t.jsx)("p",{className:"error-text",children:k}),O&&(0,t.jsxs)("div",{className:"card",style:{marginBottom:24},children:[(0,t.jsx)("h3",{style:{marginTop:0},children:"New workflow"}),(0,t.jsxs)("form",{onSubmit:v,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"workflowName",children:"Name"}),(0,t.jsx)("input",{id:"workflowName",required:!0,value:m,onChange:e=>y(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{htmlFor:"workflowDescription",children:"Description"}),(0,t.jsx)("textarea",{id:"workflowDescription",value:w,onChange:e=>b(e.target.value)})]}),(0,t.jsx)("button",{type:"submit",disabled:_||!m.trim(),children:_?"Creating...":"Create workflow"})]})]}),0===c.length?(0,t.jsx)("div",{className:"card",children:(0,t.jsxs)("p",{style:{margin:0},children:["No workflows yet",O?". Create one above to start building.":"."]})}):(0,t.jsxs)("table",{className:"data-table",children:[(0,t.jsx)("thead",{children:(0,t.jsxs)("tr",{children:[(0,t.jsx)("th",{children:"Name"}),(0,t.jsx)("th",{children:"Status"}),(0,t.jsx)("th",{children:"Steps"}),(0,t.jsx)("th",{children:"Triggers"}),(0,t.jsx)("th",{children:"Latest run"}),(0,t.jsx)("th",{})]})}),(0,t.jsx)("tbody",{children:c.map(e=>(0,t.jsxs)("tr",{children:[(0,t.jsxs)("td",{children:[(0,t.jsx)("strong",{children:e.name}),e.description&&(0,t.jsx)("div",{className:"muted",children:e.description})]}),(0,t.jsx)("td",{children:O?(0,t.jsx)("button",{className:"secondary compact",onClick:()=>T(e),children:e.active?"Active":"Paused"}):(0,t.jsx)("span",{children:e.active?"Active":"Paused"})}),(0,t.jsx)("td",{children:e.steps.length}),(0,t.jsx)("td",{children:e.triggers.length}),(0,t.jsx)("td",{children:e.runs[0]?.status??"No runs yet"}),(0,t.jsx)("td",{style:{textAlign:"right"},children:(0,t.jsx)(r.default,{href:`/workflows/${e.id}`,children:"Open builder"})})]},e.id))})]})]})}])},59e3,e=>{"use strict";let t=`
  query WorkflowsForOrg($orgId: uuid!) {
    workflows(where: { org_id: { _eq: $orgId } }, order_by: { updated_at: desc }) {
      id
      name
      description
      active
      created_by
      created_at
      updated_at
      steps(order_by: { step_order: asc }) {
        id
        name
        type
        step_order
      }
      triggers {
        id
        trigger_type
        active
      }
      runs(order_by: { created_at: desc }, limit: 1) {
        id
        status
        started_at
        completed_at
      }
    }
  }
`,r=`
  query WorkflowDetail($workflowId: uuid!) {
    workflows_by_pk(id: $workflowId) {
      id
      org_id
      name
      description
      active
      created_by
      created_at
      updated_at
      steps(order_by: { step_order: asc }) {
        id
        workflow_id
        name
        type
        step_order
        config
        created_at
        updated_at
      }
      triggers(order_by: { created_at: asc }) {
        id
        workflow_id
        trigger_type
        config
        active
        created_at
      }
      runs(order_by: { created_at: desc }, limit: 1) {
        id
        status
        started_at
        completed_at
      }
    }
  }
`,n=`
  mutation CreateWorkflow($orgId: uuid!, $name: String!, $description: String) {
    insert_workflows_one(object: { org_id: $orgId, name: $name, description: $description }) {
      id
      name
    }
  }
`,o=`
  mutation UpdateWorkflow($workflowId: uuid!, $name: String, $description: String, $active: Boolean) {
    update_workflows_by_pk(
      pk_columns: { id: $workflowId }
      _set: { name: $name, description: $description, active: $active }
    ) {
      id
      name
      description
      active
      updated_at
    }
  }
`,i=`
  mutation DeleteWorkflow($workflowId: uuid!) {
    delete_workflows_by_pk(id: $workflowId) {
      id
    }
  }
`,a=`
  mutation CreateStep($workflowId: uuid!, $stepOrder: Int!, $name: String!, $type: String!, $config: jsonb!) {
    insert_workflow_steps_one(
      object: { workflow_id: $workflowId, step_order: $stepOrder, name: $name, type: $type, config: $config }
    ) {
      id
    }
  }
`,s=`
  mutation UpdateStep($stepId: uuid!, $name: String, $type: String, $config: jsonb) {
    update_workflow_steps_by_pk(
      pk_columns: { id: $stepId }
      _set: { name: $name, type: $type, config: $config }
    ) {
      id
    }
  }
`,l=`
  mutation DeleteStep($stepId: uuid!) {
    delete_workflow_steps_by_pk(id: $stepId) {
      id
    }
  }
`,u=`
  mutation ReorderSteps(
    $firstId: uuid!
    $firstOrder: Int!
    $secondId: uuid!
    $secondOrder: Int!
    $tempOrder: Int!
  ) {
    parkFirst: update_workflow_steps_by_pk(
      pk_columns: { id: $firstId }
      _set: { step_order: $tempOrder }
    ) {
      id
    }
    moveSecond: update_workflow_steps_by_pk(
      pk_columns: { id: $secondId }
      _set: { step_order: $firstOrder }
    ) {
      id
    }
    moveFirst: update_workflow_steps_by_pk(
      pk_columns: { id: $firstId }
      _set: { step_order: $secondOrder }
    ) {
      id
    }
  }
`,d=`
  mutation CreateTrigger($workflowId: uuid!, $triggerType: String!, $config: jsonb!) {
    insert_workflow_triggers_one(
      object: { workflow_id: $workflowId, trigger_type: $triggerType, config: $config }
    ) {
      id
    }
  }
`,c=`
  mutation UpdateTrigger($triggerId: uuid!, $config: jsonb, $active: Boolean) {
    update_workflow_triggers_by_pk(
      pk_columns: { id: $triggerId }
      _set: { config: $config, active: $active }
    ) {
      id
      active
    }
  }
`,f=`
  mutation DeleteTrigger($triggerId: uuid!) {
    delete_workflow_triggers_by_pk(id: $triggerId) {
      id
    }
  }
`;e.s(["CREATE_STEP_MUTATION",0,a,"CREATE_TRIGGER_MUTATION",0,d,"CREATE_WORKFLOW_MUTATION",0,n,"DELETE_STEP_MUTATION",0,l,"DELETE_TRIGGER_MUTATION",0,f,"DELETE_WORKFLOW_MUTATION",0,i,"REORDER_STEPS_MUTATION",0,u,"UPDATE_STEP_MUTATION",0,s,"UPDATE_TRIGGER_MUTATION",0,c,"UPDATE_WORKFLOW_MUTATION",0,o,"WORKFLOWS_FOR_ORG_QUERY",0,t,"WORKFLOW_DETAIL_QUERY",0,r])},22016,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return m},useLinkStatus:function(){return w}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(90809),a=e.r(43476),s=i._(e.r(71645)),l=e.r(95057),u=e.r(8372),d=e.r(18581),c=e.r(18967),f=e.r(5550),p=e.r(88540),g=e.r(91949),_=e.r(73668),h=e.r(9396);function m(t){var r;let n,o,i,[m,w]=(0,s.useOptimistic)(g.IDLE_LINK_STATUS),b=(0,s.useRef)(null),{href:k,as:$,children:j,prefetch:v=null,passHref:T,replace:O,shallow:E,scroll:x,onClick:I,onMouseEnter:S,onTouchStart:R,legacyBehavior:N=!1,onNavigate:P,transitionTypes:C,ref:A,unstable_dynamicOnHover:U,...L}=t;n=j,N&&("string"==typeof n||"number"==typeof n)&&(n=(0,a.jsx)("a",{children:n}));let M=s.default.useContext(u.AppRouterContext),D=!1!==v,F=!1===v?"none":!0===v?"full":"auto",W="none"!==F?"auto"===F?h.FetchStrategy.PPR:h.FetchStrategy.Full:h.FetchStrategy.PPR,K="string"==typeof(r=$||k)?r:(0,l.formatUrl)(r);if(N){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});o=s.default.Children.only(n)}let B=N?o&&"object"==typeof o&&o.ref:A,q,G=s.default.useCallback(e=>(null!==M&&(b.current=(0,g.mountLinkInstance)(e,K,M,W,D,w,q)),()=>{b.current&&((0,g.unmountLinkForCurrentNavigation)(b.current),b.current=null),(0,g.unmountPrefetchableInstance)(e)}),[D,K,M,W,w,q]),z={ref:(0,d.useMergedRef)(G,B),onClick(t){N||"function"!=typeof I||I(t),N&&o.props&&"function"==typeof o.props.onClick&&o.props.onClick(t),!M||t.defaultPrevented||function(t,r,n,o,i,a,l,u="none"){if("u">typeof window){let d,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,_.isLocalURL)(r)){o&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),a){let e=!1;if(a({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:f}=e.r(99781);s.default.startTransition(()=>{f(r,o?"replace":"push",!1===i?p.ScrollBehavior.NoScroll:p.ScrollBehavior.Default,n.current,l,u)})}}(t,K,b,O,x,P,C,F)},onMouseEnter(e){N||"function"!=typeof S||S(e),N&&o.props&&"function"==typeof o.props.onMouseEnter&&o.props.onMouseEnter(e),M&&D&&(0,g.onNavigationIntent)(e.currentTarget,!0===U)},onTouchStart:function(e){N||"function"!=typeof R||R(e),N&&o.props&&"function"==typeof o.props.onTouchStart&&o.props.onTouchStart(e),M&&D&&(0,g.onNavigationIntent)(e.currentTarget,!0===U)}};return(0,c.isAbsoluteUrl)(K)?z.href=K:N&&!T&&("a"!==o.type||"href"in o.props)||(z.href=(0,f.addBasePath)(K)),i=N?s.default.cloneElement(o,z):(0,a.jsx)("a",{...L,...z,children:n}),(0,a.jsx)(y.Provider,{value:m,children:i})}let y=(0,s.createContext)(g.IDLE_LINK_STATUS),w=()=>(0,s.useContext)(y);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(71645);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=i(e,n)),t&&(o.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return m},MiddlewareNotFoundError:function(){return k},MissingStaticPage:function(){return b},NormalizeError:function(){return y},PageNotFoundError:function(){return w},SP:function(){return _},ST:function(){return h},WEB_VITALS:function(){return i},execOnce:function(){return a},getDisplayName:function(){return c},getLocationOrigin:function(){return u},getURL:function(){return d},isAbsoluteUrl:function(){return l},isResSent:function(){return f},loadGetInitialProps:function(){return g},normalizeRepeatedSlashes:function(){return p},stringifyError:function(){return $}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function a(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&s.test(e)};function u(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function d(){let{href:e}=window.location,t=u();return e.substring(t.length)}function c(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function f(e){return e.finished||e.headersSent}function p(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function g(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await g(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&f(r))return n;if(!n)throw Object.defineProperty(Error(`"${c(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let _="u">typeof performance,h=_&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class m extends Error{}class y extends Error{}class w extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class b extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class k extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function $(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let n=e.r(18967),o=e.r(52817);function i(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return i},urlQueryToSearchParams:function(){return s}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});function i(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function a(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,a(e));else t.set(r,a(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return s},formatWithValidation:function(){return u},urlObjectKeys:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let i=e.r(90809)._(e.r(98183)),a=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",s=e.hash||"",l=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),l&&"object"==typeof l&&(l=String(i.urlQueryToSearchParams(l)));let d=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||a.test(n))&&!1!==u?(u="//"+(u||""),o&&"/"!==o[0]&&(o="/"+o)):u||(u=""),s&&"#"!==s[0]&&(s="#"+s),d&&"?"!==d[0]&&(d="?"+d),o=o.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${n}${u}${o}${d}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return s(e)}},18566,(e,t,r)=>{t.exports=e.r(76562)}]);