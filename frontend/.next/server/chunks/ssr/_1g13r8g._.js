module.exports=[93728,a=>{"use strict";var b=a.i(87924),c=a.i(38246),d=a.i(50944),e=a.i(72131),f=a.i(83905),g=a.i(49391),h=a.i(29693);a.s(["default",0,function(){var a;let i=(0,d.useRouter)(),{currentOrg:j,isLoading:k}=(0,g.useOrg)(),[l,m]=(0,e.useState)([]),[n,o]=(0,e.useState)(!0),[p,q]=(0,e.useState)(!1),[r,s]=(0,e.useState)(""),[t,u]=(0,e.useState)(""),[v,w]=(0,e.useState)(null),x=(0,e.useCallback)(async()=>{if(!j){m([]),o(!1);return}o(!0),w(null);try{let a=await f.nhost.graphql.request({query:h.WORKFLOWS_FOR_ORG_QUERY,variables:{orgId:j.id}});m(a.body.data?.workflows??[])}catch(a){w(a instanceof Error?a.message:"Could not load workflows")}finally{o(!1)}},[j]);async function y(a){if(a.preventDefault(),j){q(!0),w(null);try{let a=await f.nhost.graphql.request({query:h.CREATE_WORKFLOW_MUTATION,variables:{orgId:j.id,name:r.trim(),description:t.trim()||null}}),b=a.body.data?.insert_workflows_one?.id;if(!b)throw Error("Workflow was created but no id was returned");i.push(`/workflows/${b}`)}catch(a){w(a instanceof Error?a.message:"Could not create workflow")}finally{q(!1)}}}async function z(a){try{await f.nhost.graphql.request({query:h.UPDATE_WORKFLOW_MUTATION,variables:{workflowId:a.id,name:a.name,description:a.description,active:!a.active}}),await x()}catch(a){w(a instanceof Error?a.message:"Could not update workflow")}}if((0,e.useEffect)(()=>{x()},[x]),k||n)return(0,b.jsx)("main",{className:"page",children:(0,b.jsx)("p",{className:"muted",children:"Loading..."})});if(!j)return(0,b.jsx)("main",{className:"page",children:(0,b.jsxs)("p",{className:"muted",children:["You're not in an organization yet."," ",(0,b.jsx)(c.default,{href:"/organizations/new",children:"Create one"}),"."]})});let A="owner"===(a=j.myRole)||"editor"===a;return(0,b.jsxs)("main",{className:"page page-wide",children:[(0,b.jsx)("p",{children:(0,b.jsx)(c.default,{href:"/",children:"← Back"})}),(0,b.jsx)("div",{className:"page-heading",children:(0,b.jsxs)("div",{children:[(0,b.jsx)("h1",{children:"Workflows"}),(0,b.jsxs)("p",{className:"muted",children:[j.name," · your role: ",j.myRole]})]})}),v&&(0,b.jsx)("p",{className:"error-text",children:v}),A&&(0,b.jsxs)("div",{className:"card",style:{marginBottom:24},children:[(0,b.jsx)("h3",{style:{marginTop:0},children:"New workflow"}),(0,b.jsxs)("form",{onSubmit:y,children:[(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"workflowName",children:"Name"}),(0,b.jsx)("input",{id:"workflowName",required:!0,value:r,onChange:a=>s(a.target.value)})]}),(0,b.jsxs)("div",{className:"field",children:[(0,b.jsx)("label",{htmlFor:"workflowDescription",children:"Description"}),(0,b.jsx)("textarea",{id:"workflowDescription",value:t,onChange:a=>u(a.target.value)})]}),(0,b.jsx)("button",{type:"submit",disabled:p||!r.trim(),children:p?"Creating...":"Create workflow"})]})]}),0===l.length?(0,b.jsx)("div",{className:"card",children:(0,b.jsxs)("p",{style:{margin:0},children:["No workflows yet",A?". Create one above to start building.":"."]})}):(0,b.jsxs)("table",{className:"data-table",children:[(0,b.jsx)("thead",{children:(0,b.jsxs)("tr",{children:[(0,b.jsx)("th",{children:"Name"}),(0,b.jsx)("th",{children:"Status"}),(0,b.jsx)("th",{children:"Steps"}),(0,b.jsx)("th",{children:"Triggers"}),(0,b.jsx)("th",{children:"Latest run"}),(0,b.jsx)("th",{})]})}),(0,b.jsx)("tbody",{children:l.map(a=>(0,b.jsxs)("tr",{children:[(0,b.jsxs)("td",{children:[(0,b.jsx)("strong",{children:a.name}),a.description&&(0,b.jsx)("div",{className:"muted",children:a.description})]}),(0,b.jsx)("td",{children:A?(0,b.jsx)("button",{className:"secondary compact",onClick:()=>z(a),children:a.active?"Active":"Paused"}):(0,b.jsx)("span",{children:a.active?"Active":"Paused"})}),(0,b.jsx)("td",{children:a.steps.length}),(0,b.jsx)("td",{children:a.triggers.length}),(0,b.jsx)("td",{children:a.runs[0]?.status??"No runs yet"}),(0,b.jsx)("td",{style:{textAlign:"right"},children:(0,b.jsx)(c.default,{href:`/workflows/${a.id}`,children:"Open builder"})})]},a.id))})]})]})}])},29693,a=>{"use strict";let b=`
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
`,c=`
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
`,d=`
  mutation CreateWorkflow($orgId: uuid!, $name: String!, $description: String) {
    insert_workflows_one(object: { org_id: $orgId, name: $name, description: $description }) {
      id
      name
    }
  }
`,e=`
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
`,f=`
  mutation DeleteWorkflow($workflowId: uuid!) {
    delete_workflows_by_pk(id: $workflowId) {
      id
    }
  }
`,g=`
  mutation CreateStep($workflowId: uuid!, $stepOrder: Int!, $name: String!, $type: String!, $config: jsonb!) {
    insert_workflow_steps_one(
      object: { workflow_id: $workflowId, step_order: $stepOrder, name: $name, type: $type, config: $config }
    ) {
      id
    }
  }
`,h=`
  mutation UpdateStep($stepId: uuid!, $name: String, $type: String, $config: jsonb) {
    update_workflow_steps_by_pk(
      pk_columns: { id: $stepId }
      _set: { name: $name, type: $type, config: $config }
    ) {
      id
    }
  }
`,i=`
  mutation DeleteStep($stepId: uuid!) {
    delete_workflow_steps_by_pk(id: $stepId) {
      id
    }
  }
`,j=`
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
`,k=`
  mutation CreateTrigger($workflowId: uuid!, $triggerType: String!, $config: jsonb!) {
    insert_workflow_triggers_one(
      object: { workflow_id: $workflowId, trigger_type: $triggerType, config: $config }
    ) {
      id
    }
  }
`,l=`
  mutation UpdateTrigger($triggerId: uuid!, $config: jsonb, $active: Boolean) {
    update_workflow_triggers_by_pk(
      pk_columns: { id: $triggerId }
      _set: { config: $config, active: $active }
    ) {
      id
      active
    }
  }
`,m=`
  mutation DeleteTrigger($triggerId: uuid!) {
    delete_workflow_triggers_by_pk(id: $triggerId) {
      id
    }
  }
`;a.s(["CREATE_STEP_MUTATION",0,g,"CREATE_TRIGGER_MUTATION",0,k,"CREATE_WORKFLOW_MUTATION",0,d,"DELETE_STEP_MUTATION",0,i,"DELETE_TRIGGER_MUTATION",0,m,"DELETE_WORKFLOW_MUTATION",0,f,"REORDER_STEPS_MUTATION",0,j,"UPDATE_STEP_MUTATION",0,h,"UPDATE_TRIGGER_MUTATION",0,l,"UPDATE_WORKFLOW_MUTATION",0,e,"WORKFLOWS_FOR_ORG_QUERY",0,b,"WORKFLOW_DETAIL_QUERY",0,c])},46058,(a,b,c)=>{"use strict";function d(a){if("function"!=typeof WeakMap)return null;var b=new WeakMap,c=new WeakMap;return(d=function(a){return a?c:b})(a)}c._=function(a,b){if(!b&&a&&a.__esModule)return a;if(null===a||"object"!=typeof a&&"function"!=typeof a)return{default:a};var c=d(b);if(c&&c.has(a))return c.get(a);var e={__proto__:null},f=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var g in a)if("default"!==g&&Object.prototype.hasOwnProperty.call(a,g)){var h=f?Object.getOwnPropertyDescriptor(a,g):null;h&&(h.get||h.set)?Object.defineProperty(e,g,h):e[g]=a[g]}return e.default=a,c&&c.set(a,e),e}},69789,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={actionAsyncStorage:function(){return f.actionAsyncStorage},workAsyncStorage:function(){return g.workAsyncStorage},workUnitAsyncStorage:function(){return h.workUnitAsyncStorage}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});let f=a.r(20635),g=a.r(56704),h=a.r(32319);("function"==typeof c.default||"object"==typeof c.default&&null!==c.default)&&void 0===c.default.__esModule&&(Object.defineProperty(c.default,"__esModule",{value:!0}),Object.assign(c.default,c),b.exports=c.default)},14827,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={createLinkPrefetchPartialError:function(){return g},createUnrenderedSegmentError:function(){return f}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a,b){let c=`Route "${a}": Could not validate that a segment in your UI has instant navigation.`;if(b.length>0){let a=1===b.length?"Dropped segment":"Dropped segments";c+=`

This segment was dropped from rendering. Issues that would prevent instant navigation will go undetected.

${a}:
${b.map(a=>`  ${a}`).join("\n")}

Ways to fix this:
  - [render] Render the dropped segment
  - [ignore] Set \`export const instant = false\` to opt the dropped segment out of instant-navigation validation

Learn more: https://nextjs.org/docs/messages/instant-unrendered-segment`}return Object.defineProperty(Error(c),"__NEXT_ERROR_CODE",{value:"E1286",enumerable:!1,configurable:!0})}function g(a){return Object.defineProperty(Error(`Next.js encountered dynamic data during prefetching for "${a}".

This will lead to slower, more expensive prefetches.

Ways to fix this:
  - [upgrade] Opt into Partial Prefetching by exporting \`const prefetch = 'partial'\` from the page or layout, or by setting \`partialPrefetching: true\` in next.config to opt the whole app in
  - [disable] Remove \`prefetch={true}\` from the <Link> to use the default prefetch
  - [ignore] Set \`export const instant = false\` to opt the route out of instant-navigation validation

Learn more: https://nextjs.org/docs/messages/instant-link-prefetch-partial`),"__NEXT_ERROR_CODE",{value:"E1435",enumerable:!1,configurable:!0})}},88644,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"InvariantError",{enumerable:!0,get:function(){return d}});class d extends Error{constructor(a,b){super(`Invariant: ${a.endsWith(".")?a:a+"."} This is a bug in Next.js.`,b),Object.defineProperty(this,"__NEXT_ERROR_CODE",{value:"E1179",enumerable:!1,configurable:!0}),this.name="InvariantError"}}},54427,(a,b,c)=>{"use strict";function d(){let a,b,c=new Promise((c,d)=>{a=c,b=d});return{resolve:a,reject:b,promise:c}}Object.defineProperty(c,"__esModule",{value:!0}),Object.defineProperty(c,"createPromiseWithResolvers",{enumerable:!0,get:function(){return d}})},39118,(a,b,c)=>{"use strict";Object.defineProperty(c,"__esModule",{value:!0});var d={DEFAULT_SEGMENT_KEY:function(){return l},NOT_FOUND_SEGMENT_KEY:function(){return m},PAGE_SEGMENT_KEY:function(){return k},addSearchParamsIfPageSegment:function(){return i},computeSelectedLayoutSegment:function(){return j},getSegmentValue:function(){return f},getSelectedLayoutSegmentPath:function(){return function a(b,c,d=!0,e=[]){let g;if(d)g=b[1][c];else{let a=b[1];g=a.children??Object.values(a)[0]}if(!g)return e;let h=f(g[0]);return!h||h.startsWith(k)?e:(e.push(h),a(g,c,!1,e))}},isGroupSegment:function(){return g},isParallelRouteSegment:function(){return h}};for(var e in d)Object.defineProperty(c,e,{enumerable:!0,get:d[e]});function f(a){return Array.isArray(a)?a[1]:a}function g(a){return"("===a[0]&&a.endsWith(")")}function h(a){return a.startsWith("@")&&"@children"!==a}function i(a,b){if(a.includes(k)){let a=JSON.stringify(b);return"{}"!==a?k+"?"+a:k}return a}function j(a,b){if(!a||0===a.length)return null;let c="children"===b?a[0]:a[a.length-1];return c===l?null:c}let k="__PAGE__",l="__DEFAULT__",m="/_not-found"}];

//# sourceMappingURL=_1g13r8g._.js.map