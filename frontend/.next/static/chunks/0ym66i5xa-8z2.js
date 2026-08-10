(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,79116,e=>{"use strict";var t=e.i(43476),r=e.i(22016),n=e.i(18566),a=e.i(71645),i=e.i(46477),o=e.i(15634),s=e.i(59e3);let l=["llm_call","http_request","conditional_branch","approval_gate","db_write","notify"],c=["manual","scheduled","database_event","webhook"],d=new Set(["db_write","notify"]);function u(e){return"owner"===e||"editor"===e}function p(e,t){return u(e)&&(!d.has(t)||"owner"===e)}function f(e,t){return u(e)&&("webhook"!==t||"owner"===e)}function h(e){switch(e){case"llm_call":return{provider:"gemini",model:"",prompt:"",temperature:.2};case"http_request":return{method:"GET",url:"",headers:{},body:null};case"db_write":return{label:""};case"notify":return{webhookUrl:"",message:""};case"conditional_branch":return{field:"",operator:"contains",value:""};case"approval_gate":return{note:""}}}function g(e){return"string"==typeof e?e:""}function m(e,t){if(!e.trim())return t;try{return JSON.parse(e)}catch{return t}}function y({type:e,config:r,setConfig:n}){function a(e,t){n({...r,[e]:t})}if("llm_call"===e){var i;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Provider"}),(0,t.jsxs)("select",{value:g(r.provider),onChange:e=>a("provider",e.target.value),children:[(0,t.jsx)("option",{value:"gemini",children:"gemini"}),(0,t.jsx)("option",{value:"groq",children:"groq"}),(0,t.jsx)("option",{value:"openrouter",children:"openrouter"})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Model"}),(0,t.jsx)("input",{value:g(r.model),onChange:e=>a("model",e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Prompt"}),(0,t.jsx)("textarea",{value:g(r.prompt),onChange:e=>a("prompt",e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Temperature"}),(0,t.jsx)("input",{type:"number",min:"0",max:"1",step:"0.1",value:"number"==typeof(i=r.temperature)?i:.2,onChange:e=>a("temperature",Number(e.target.value))})]})]})}return"http_request"===e?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Method"}),(0,t.jsx)("select",{value:g(r.method)||"GET",onChange:e=>a("method",e.target.value),children:["GET","POST","PUT","PATCH","DELETE"].map(e=>(0,t.jsx)("option",{value:e,children:e},e))})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"URL"}),(0,t.jsx)("input",{value:g(r.url),onChange:e=>a("url",e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Headers JSON"}),(0,t.jsx)("textarea",{value:JSON.stringify(r.headers??{},null,2),onChange:e=>a("headers",m(e.target.value,{}))})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Body JSON"}),(0,t.jsx)("textarea",{value:JSON.stringify(r.body??null,null,2),onChange:e=>a("body",m(e.target.value,null))})]})]}):"db_write"===e?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("p",{className:"muted",children:"Writes step output to workflow_results."}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Result label"}),(0,t.jsx)("input",{value:g(r.label),onChange:e=>a("label",e.target.value)})]})]}):"notify"===e?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Webhook URL"}),(0,t.jsx)("input",{value:g(r.webhookUrl),onChange:e=>a("webhookUrl",e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Message"}),(0,t.jsx)("textarea",{value:g(r.message),onChange:e=>a("message",e.target.value)})]})]}):"conditional_branch"===e?(0,t.jsxs)("div",{className:"inline-fields",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Field"}),(0,t.jsx)("input",{value:g(r.field),onChange:e=>a("field",e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Operator"}),(0,t.jsxs)("select",{value:g(r.operator)||"contains",onChange:e=>a("operator",e.target.value),children:[(0,t.jsx)("option",{value:"contains",children:"contains"}),(0,t.jsx)("option",{value:"equals",children:"equals"}),(0,t.jsx)("option",{value:"exists",children:"exists"})]})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Value"}),(0,t.jsx)("input",{value:g(r.value),onChange:e=>a("value",e.target.value)})]})]}):(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Approval note"}),(0,t.jsx)("textarea",{value:g(r.note),onChange:e=>a("note",e.target.value)})]})}e.s(["default",0,function({params:e}){let d=(0,n.useRouter)(),{currentOrg:_,isLoading:v}=(0,o.useOrg)(),[j,x]=(0,a.useState)(null),[b,w]=(0,a.useState)(!0),[T,k]=(0,a.useState)(null),[N,E]=(0,a.useState)(""),[O,I]=(0,a.useState)(""),[$,S]=(0,a.useState)(null),[C,R]=(0,a.useState)(""),[P,A]=(0,a.useState)("llm_call"),[U,q]=(0,a.useState)({}),[M,D]=(0,a.useState)(""),[L,F]=(0,a.useState)("llm_call"),[W,B]=(0,a.useState)(h("llm_call")),[G,K]=(0,a.useState)("manual"),[z,J]=(0,a.useState)({}),Q=u(_?.myRole),Y=(0,a.useMemo)(()=>l.filter(e=>p(_?.myRole,e)),[_?.myRole]),V=(0,a.useMemo)(()=>c.filter(e=>f(_?.myRole,e)),[_?.myRole]),X=(0,a.useCallback)(async()=>{if(!_){x(null),w(!1);return}w(!0),k(null);try{let t=await i.nhost.graphql.request({query:s.WORKFLOW_DETAIL_QUERY,variables:{workflowId:e.workflowId}}),r=t.body.data?.workflows_by_pk;if(!r||r.org_id!==_.id){x(null),k("Workflow not found in the selected organization");return}x(r),E(r.name),I(r.description??""),J(Object.fromEntries(r.triggers.map(e=>[e.id,JSON.stringify(e.config??{},null,2)])))}catch(e){k(e instanceof Error?e.message:"Could not load workflow")}finally{w(!1)}},[_,e.workflowId]);function H(e){F(e),B(h(e))}async function Z(e){if(e.preventDefault(),j)try{await i.nhost.graphql.request({query:s.UPDATE_WORKFLOW_MUTATION,variables:{workflowId:j.id,name:N.trim(),description:O.trim()||null,active:j.active}}),await X()}catch(e){k(e instanceof Error?e.message:"Could not update workflow")}}async function ee(){if(j)try{await i.nhost.graphql.request({query:s.UPDATE_WORKFLOW_MUTATION,variables:{workflowId:j.id,name:j.name,description:j.description,active:!j.active}}),await X()}catch(e){k(e instanceof Error?e.message:"Could not update workflow")}}async function et(){if(j&&confirm("Delete this workflow and all of its steps/triggers?"))try{await i.nhost.graphql.request({query:s.DELETE_WORKFLOW_MUTATION,variables:{workflowId:j.id}}),d.push("/workflows")}catch(e){k(e instanceof Error?e.message:"Could not delete workflow")}}async function er(e){if(e.preventDefault(),j&&p(_?.myRole,L))try{let e=(j.steps.at(-1)?.step_order??0)+1;await i.nhost.graphql.request({query:s.CREATE_STEP_MUTATION,variables:{workflowId:j.id,stepOrder:e,name:M.trim(),type:L,config:W}}),D(""),H(Y[0]??"llm_call"),await X()}catch(e){k(e instanceof Error?e.message:"Could not create step")}}async function en(e){if(p(_?.myRole,e.type)&&p(_?.myRole,P))try{await i.nhost.graphql.request({query:s.UPDATE_STEP_MUTATION,variables:{stepId:e.id,name:C.trim(),type:P,config:U}}),await X()}catch(e){k(e instanceof Error?e.message:"Could not update step")}}async function ea(e){if(p(_?.myRole,e.type)&&confirm("Delete this step?"))try{await i.nhost.graphql.request({query:s.DELETE_STEP_MUTATION,variables:{stepId:e.id}}),await X()}catch(e){k(e instanceof Error?e.message:"Could not delete step")}}async function ei(e,t){if(!j)return;let r=j.steps[e],n=j.steps[e+t];if(r&&n&&p(_?.myRole,r.type)&&p(_?.myRole,n.type))try{await i.nhost.graphql.request({query:s.REORDER_STEPS_MUTATION,variables:{firstId:r.id,firstOrder:r.step_order,secondId:n.id,secondOrder:n.step_order,tempOrder:-Math.floor(Date.now()/1e3)}}),await X()}catch(e){k(e instanceof Error?e.message:"Could not reorder steps")}}async function eo(e){if(e.preventDefault(),j&&f(_?.myRole,G))try{await i.nhost.graphql.request({query:s.CREATE_TRIGGER_MUTATION,variables:{workflowId:j.id,triggerType:G,config:"webhook"===G?{token:crypto.randomUUID()}:"scheduled"===G?{cron:"0 * * * *"}:"database_event"===G?{table:"",operation:"insert"}:{}}}),await X()}catch(e){k(e instanceof Error?e.message:"Could not create trigger")}}async function es(e,t=e.active){if(f(_?.myRole,e.trigger_type))try{await i.nhost.graphql.request({query:s.UPDATE_TRIGGER_MUTATION,variables:{triggerId:e.id,config:m(z[e.id]??"{}",{}),active:t}}),await X()}catch(e){k(e instanceof Error?e.message:"Could not update trigger")}}async function el(e){if(f(_?.myRole,e.trigger_type)&&confirm("Delete this trigger?"))try{await i.nhost.graphql.request({query:s.DELETE_TRIGGER_MUTATION,variables:{triggerId:e.id}}),await X()}catch(e){k(e instanceof Error?e.message:"Could not delete trigger")}}return(0,a.useEffect)(()=>{X()},[X]),v||b?(0,t.jsx)("main",{className:"page",children:(0,t.jsx)("p",{className:"muted",children:"Loading..."})}):_?j?(0,t.jsxs)("main",{className:"page page-wide",children:[(0,t.jsx)("p",{children:(0,t.jsx)(r.default,{href:"/workflows",children:"← Back to workflows"})}),T&&(0,t.jsx)("p",{className:"error-text",children:T}),(0,t.jsx)("div",{className:"card",style:{marginBottom:24},children:Q?(0,t.jsxs)("form",{onSubmit:Z,children:[(0,t.jsxs)("div",{className:"inline-fields",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Name"}),(0,t.jsx)("input",{value:N,onChange:e=>E(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Description"}),(0,t.jsx)("input",{value:O,onChange:e=>I(e.target.value)})]})]}),(0,t.jsxs)("div",{className:"button-row",children:[(0,t.jsx)("button",{type:"submit",disabled:!N.trim(),children:"Save workflow"}),(0,t.jsx)("button",{type:"button",className:"secondary",onClick:ee,children:j.active?"Pause":"Activate"}),"owner"===_.myRole&&(0,t.jsx)("button",{type:"button",className:"secondary danger",onClick:et,children:"Delete workflow"}),(0,t.jsx)("button",{type:"button",disabled:!0,title:"Workflow execution coming in a later phase",children:"Run"})]})]}):(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("h1",{style:{marginTop:0},children:j.name}),j.description&&(0,t.jsx)("p",{children:j.description}),(0,t.jsx)("p",{className:"muted",children:"Viewer access · workflow execution coming in a later phase"})]})}),(0,t.jsxs)("section",{style:{marginBottom:24},children:[(0,t.jsx)("h2",{children:"Steps"}),0===j.steps.length?(0,t.jsx)("div",{className:"card",children:(0,t.jsx)("p",{style:{margin:0},children:"No steps yet."})}):(0,t.jsx)("div",{className:"stack",children:j.steps.map((e,r)=>{var n,a;let i=p(_.myRole,e.type);return(0,t.jsxs)("div",{className:"card",children:[(0,t.jsx)("button",{className:"plain-row",type:"button",onClick:()=>{S($===e.id?null:e.id),R(e.name),A(e.type),q(e.config??h(e.type))},children:(0,t.jsxs)("span",{children:[(0,t.jsxs)("strong",{children:[e.step_order,". ",e.name]}),(0,t.jsxs)("span",{className:"muted",children:[" · ",e.type]}),(0,t.jsx)("div",{className:"muted",children:(n=e.type,a=e.config??{},"llm_call"===n?`${g(a.provider)||"provider"} ${g(a.model)||"model"}${g(a.prompt)?" · prompt set":""}`:"http_request"===n?`${g(a.method)||"GET"} ${g(a.url)||"no URL yet"}`:"db_write"===n?"Writes step output to workflow_results":"notify"===n?g(a.webhookUrl)?"Webhook notification configured":"Notification target missing":"conditional_branch"===n?`${g(a.field)||"field"} ${g(a.operator)||"contains"} ${g(a.value)||"value"}`:g(a.note)||"Approval required before continuing")})]})}),$===e.id&&(0,t.jsx)("div",{style:{marginTop:16},children:i?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"inline-fields",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Name"}),(0,t.jsx)("input",{value:C,onChange:e=>R(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Type"}),(0,t.jsx)("select",{value:P,onChange:e=>{var t;A(t=e.target.value),q(h(t))},children:Y.map(e=>(0,t.jsx)("option",{value:e,children:e},e))})]})]}),(0,t.jsx)(y,{type:P,config:U,setConfig:q}),(0,t.jsxs)("div",{className:"button-row",children:[(0,t.jsx)("button",{type:"button",onClick:()=>en(e),disabled:!C.trim(),children:"Save step"}),(0,t.jsx)("button",{type:"button",className:"secondary",onClick:()=>ei(r,-1),disabled:0===r,children:"Move up"}),(0,t.jsx)("button",{type:"button",className:"secondary",onClick:()=>ei(r,1),disabled:r===j.steps.length-1,children:"Move down"}),(0,t.jsx)("button",{type:"button",className:"secondary danger",onClick:()=>ea(e),children:"Delete"})]})]}):(0,t.jsx)("p",{className:"muted",children:"Your role can view this step but cannot edit this step type."})})]},e.id)})})]}),Q&&Y.length>0&&(0,t.jsxs)("div",{className:"card",style:{marginBottom:24},children:[(0,t.jsx)("h3",{style:{marginTop:0},children:"Add step"}),(0,t.jsxs)("form",{onSubmit:er,children:[(0,t.jsxs)("div",{className:"inline-fields",children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Name"}),(0,t.jsx)("input",{value:M,onChange:e=>D(e.target.value)})]}),(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Type"}),(0,t.jsx)("select",{value:L,onChange:e=>H(e.target.value),children:Y.map(e=>(0,t.jsx)("option",{value:e,children:e},e))})]})]}),(0,t.jsx)(y,{type:L,config:W,setConfig:B}),(0,t.jsx)("button",{type:"submit",disabled:!M.trim(),children:"Add step"})]})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("h2",{children:"Triggers"}),(0,t.jsx)("div",{className:"stack",style:{marginBottom:16},children:0===j.triggers.length?(0,t.jsx)("div",{className:"card",children:(0,t.jsx)("p",{style:{margin:0},children:"No triggers yet."})}):j.triggers.map(e=>{let r=f(_.myRole,e.trigger_type);return(0,t.jsxs)("div",{className:"card",children:[(0,t.jsxs)("div",{className:"row-between",children:[(0,t.jsx)("strong",{children:e.trigger_type}),(0,t.jsx)("span",{children:e.active?"Active":"Paused"})]}),"webhook"===e.trigger_type&&(0,t.jsxs)("p",{className:"muted",children:["Token: ",g(e.config?.token)]}),r?(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Config JSON"}),(0,t.jsx)("textarea",{value:z[e.id]??"{}",onChange:t=>J({...z,[e.id]:t.target.value})})]}),(0,t.jsxs)("div",{className:"button-row",children:[(0,t.jsx)("button",{type:"button",onClick:()=>es(e),children:"Save trigger"}),(0,t.jsx)("button",{type:"button",className:"secondary",onClick:()=>es(e,!e.active),children:e.active?"Pause":"Activate"}),(0,t.jsx)("button",{type:"button",className:"secondary danger",onClick:()=>el(e),children:"Delete"})]})]}):(0,t.jsx)("p",{className:"muted",children:"Your role can view this trigger but cannot edit it."})]},e.id)})}),Q&&V.length>0&&(0,t.jsxs)("div",{className:"card",children:[(0,t.jsx)("h3",{style:{marginTop:0},children:"Add trigger"}),(0,t.jsxs)("form",{onSubmit:eo,children:[(0,t.jsxs)("div",{className:"field",children:[(0,t.jsx)("label",{children:"Trigger type"}),(0,t.jsx)("select",{value:G,onChange:e=>K(e.target.value),children:V.map(e=>(0,t.jsx)("option",{value:e,children:e},e))})]}),(0,t.jsx)("button",{type:"submit",children:"Add trigger"})]})]})]})]}):(0,t.jsxs)("main",{className:"page",children:[(0,t.jsx)("p",{children:(0,t.jsx)(r.default,{href:"/workflows",children:"← Back to workflows"})}),T?(0,t.jsx)("p",{className:"error-text",children:T}):(0,t.jsx)("p",{className:"muted",children:"Workflow not found."})]}):(0,t.jsx)("main",{className:"page",children:(0,t.jsxs)("p",{className:"muted",children:["You're not in an organization yet. ",(0,t.jsx)(r.default,{href:"/organizations/new",children:"Create one"}),"."]})})}])},59e3,e=>{"use strict";let t=`
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
`,a=`
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
`,o=`
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
`,c=`
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
`,u=`
  mutation UpdateTrigger($triggerId: uuid!, $config: jsonb, $active: Boolean) {
    update_workflow_triggers_by_pk(
      pk_columns: { id: $triggerId }
      _set: { config: $config, active: $active }
    ) {
      id
      active
    }
  }
`,p=`
  mutation DeleteTrigger($triggerId: uuid!) {
    delete_workflow_triggers_by_pk(id: $triggerId) {
      id
    }
  }
`;e.s(["CREATE_STEP_MUTATION",0,o,"CREATE_TRIGGER_MUTATION",0,d,"CREATE_WORKFLOW_MUTATION",0,n,"DELETE_STEP_MUTATION",0,l,"DELETE_TRIGGER_MUTATION",0,p,"DELETE_WORKFLOW_MUTATION",0,i,"REORDER_STEPS_MUTATION",0,c,"UPDATE_STEP_MUTATION",0,s,"UPDATE_TRIGGER_MUTATION",0,u,"UPDATE_WORKFLOW_MUTATION",0,a,"WORKFLOWS_FOR_ORG_QUERY",0,t,"WORKFLOW_DETAIL_QUERY",0,r])},22016,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return y},useLinkStatus:function(){return v}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=e.r(90809),o=e.r(43476),s=i._(e.r(71645)),l=e.r(95057),c=e.r(8372),d=e.r(18581),u=e.r(18967),p=e.r(5550),f=e.r(88540),h=e.r(91949),g=e.r(73668),m=e.r(9396);function y(t){var r;let n,a,i,[y,v]=(0,s.useOptimistic)(h.IDLE_LINK_STATUS),j=(0,s.useRef)(null),{href:x,as:b,children:w,prefetch:T=null,passHref:k,replace:N,shallow:E,scroll:O,onClick:I,onMouseEnter:$,onTouchStart:S,legacyBehavior:C=!1,onNavigate:R,transitionTypes:P,ref:A,unstable_dynamicOnHover:U,...q}=t;n=w,C&&("string"==typeof n||"number"==typeof n)&&(n=(0,o.jsx)("a",{children:n}));let M=s.default.useContext(c.AppRouterContext),D=!1!==T,L=!1===T?"none":!0===T?"full":"auto",F="none"!==L?"auto"===L?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,W="string"==typeof(r=b||x)?r:(0,l.formatUrl)(r);if(C){if(n?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});a=s.default.Children.only(n)}let B=C?a&&"object"==typeof a&&a.ref:A,G,K=s.default.useCallback(e=>(null!==M&&(j.current=(0,h.mountLinkInstance)(e,W,M,F,D,v,G)),()=>{j.current&&((0,h.unmountLinkForCurrentNavigation)(j.current),j.current=null),(0,h.unmountPrefetchableInstance)(e)}),[D,W,M,F,v,G]),z={ref:(0,d.useMergedRef)(K,B),onClick(t){C||"function"!=typeof I||I(t),C&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!M||t.defaultPrevented||function(t,r,n,a,i,o,l,c="none"){if("u">typeof window){let d,{nodeName:u}=t.currentTarget;if("A"===u.toUpperCase()&&((d=t.currentTarget.getAttribute("target"))&&"_self"!==d||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,g.isLocalURL)(r)){a&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),o){let e=!1;if(o({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:p}=e.r(99781);s.default.startTransition(()=>{p(r,a?"replace":"push",!1===i?f.ScrollBehavior.NoScroll:f.ScrollBehavior.Default,n.current,l,c)})}}(t,W,j,N,O,R,P,L)},onMouseEnter(e){C||"function"!=typeof $||$(e),C&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),M&&D&&(0,h.onNavigationIntent)(e.currentTarget,!0===U)},onTouchStart:function(e){C||"function"!=typeof S||S(e),C&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),M&&D&&(0,h.onNavigationIntent)(e.currentTarget,!0===U)}};return(0,u.isAbsoluteUrl)(W)?z.href=W:C&&!k&&("a"!==a.type||"href"in a.props)||(z.href=(0,p.addBasePath)(W)),i=C?s.default.cloneElement(a,z):(0,o.jsx)("a",{...q,...z,children:n}),(0,o.jsx)(_.Provider,{value:y,children:i})}let _=(0,s.createContext)(h.IDLE_LINK_STATUS),v=()=>(0,s.useContext)(_);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return a}});let n=e.r(71645);function a(e,t){let r=(0,n.useRef)(null),a=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=a.current;t&&(a.current=null,t())}else e&&(r.current=i(e,n)),t&&(a.current=i(t,n))},[e,t])}function i(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},18967,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var n={DecodeError:function(){return y},MiddlewareNotFoundError:function(){return x},MissingStaticPage:function(){return j},NormalizeError:function(){return _},PageNotFoundError:function(){return v},SP:function(){return g},ST:function(){return m},WEB_VITALS:function(){return i},execOnce:function(){return o},getDisplayName:function(){return u},getLocationOrigin:function(){return c},getURL:function(){return d},isAbsoluteUrl:function(){return l},isResSent:function(){return p},loadGetInitialProps:function(){return h},normalizeRepeatedSlashes:function(){return f},stringifyError:function(){return b}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=["CLS","FCP","FID","INP","LCP","TTFB"];function o(e){let t,r=!1;return(...n)=>(r||(r=!0,t=e(...n)),t)}let s=/^[a-zA-Z][a-zA-Z\d+\-.]*?:/,l=e=>{let t=e.charCodeAt(0);return!!(t>=65&&t<=90||t>=97&&t<=122)&&s.test(e)};function c(){let{protocol:e,hostname:t,port:r}=window.location;return`${e}//${t}${r?":"+r:""}`}function d(){let{href:e}=window.location,t=c();return e.substring(t.length)}function u(e){return"string"==typeof e?e:e.displayName||e.name||"Unknown"}function p(e){return e.finished||e.headersSent}function f(e){let t=e.split("?");return t[0].replace(/\\/g,"/").replace(/\/\/+/g,"/")+(t[1]?`?${t.slice(1).join("?")}`:"")}async function h(e,t){let r=t.res||t.ctx&&t.ctx.res;if(!e.getInitialProps)return t.ctx&&t.Component?{pageProps:await h(t.Component,t.ctx)}:{};let n=await e.getInitialProps(t);if(r&&p(r))return n;if(!n)throw Object.defineProperty(Error(`"${u(e)}.getInitialProps()" should resolve to an object. But found "${n}" instead.`),"__NEXT_ERROR_CODE",{value:"E1025",enumerable:!1,configurable:!0});return n}let g="u">typeof performance,m=g&&["mark","measure","getEntriesByName"].every(e=>"function"==typeof performance[e]);class y extends Error{}class _ extends Error{}class v extends Error{constructor(e){super(),this.code="ENOENT",this.name="PageNotFoundError",this.message=`Cannot find module for page: ${e}`}}class j extends Error{constructor(e,t){super(),this.message=`Failed to load static file for page: ${e} ${t}`}}class x extends Error{constructor(){super(),this.code="ENOENT",this.message="Cannot find the middleware module"}}function b(e){return JSON.stringify({message:e.message,stack:e.stack})}},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return i}});let n=e.r(18967),a=e.r(52817);function i(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,a.hasBasePath)(r.pathname)}catch(e){return!1}}},98183,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={assign:function(){return l},searchParamsToUrlQuery:function(){return i},urlQueryToSearchParams:function(){return s}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});function i(e){let t={};for(let[r,n]of e.entries()){let e=t[r];void 0===e?t[r]=n:Array.isArray(e)?e.push(n):t[r]=[e,n]}return t}function o(e){return"string"==typeof e?e:("number"!=typeof e||isNaN(e))&&"boolean"!=typeof e?"":String(e)}function s(e){let t=new URLSearchParams;for(let[r,n]of Object.entries(e))if(Array.isArray(n))for(let e of n)t.append(r,o(e));else t.set(r,o(n));return t}function l(e,...t){for(let r of t){for(let t of r.keys())e.delete(t);for(let[t,n]of r.entries())e.append(t,n)}return e}},95057,(e,t,r)=>{"use strict";e.i(47167),Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return s},formatWithValidation:function(){return c},urlObjectKeys:function(){return l}};for(var a in n)Object.defineProperty(r,a,{enumerable:!0,get:n[a]});let i=e.r(90809)._(e.r(98183)),o=/https?|ftp|gopher|file/;function s(e){let{auth:t,hostname:r}=e,n=e.protocol||"",a=e.pathname||"",s=e.hash||"",l=e.query||"",c=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?c=t+e.host:r&&(c=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(c+=":"+e.port)),l&&"object"==typeof l&&(l=String(i.urlQueryToSearchParams(l)));let d=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||o.test(n))&&!1!==c?(c="//"+(c||""),a&&"/"!==a[0]&&(a="/"+a)):c||(c=""),s&&"#"!==s[0]&&(s="#"+s),d&&"?"!==d[0]&&(d="?"+d),a=a.replace(/[?#]/g,encodeURIComponent),d=d.replace("#","%23"),`${n}${c}${a}${d}${s}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function c(e){return s(e)}},18566,(e,t,r)=>{t.exports=e.r(76562)}]);