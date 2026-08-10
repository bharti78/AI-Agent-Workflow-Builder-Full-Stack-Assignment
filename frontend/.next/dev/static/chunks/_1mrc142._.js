(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/app/workflows/[workflowId]/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>WorkflowBuilderPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/nhost.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$org$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/org-context.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/graphql/workflows.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const STEP_TYPES = [
    "llm_call",
    "http_request",
    "conditional_branch",
    "approval_gate",
    "db_write",
    "notify"
];
const TRIGGER_TYPES = [
    "manual",
    "scheduled",
    "database_event",
    "webhook"
];
const OWNER_STEP_TYPES = new Set([
    "db_write",
    "notify"
]);
function canEdit(role) {
    return role === "owner" || role === "editor";
}
function canManageStep(role, type) {
    return canEdit(role) && (!OWNER_STEP_TYPES.has(type) || role === "owner");
}
function canManageTrigger(role, triggerType) {
    return canEdit(role) && (triggerType !== "webhook" || role === "owner");
}
function defaultStepConfig(type) {
    switch(type){
        case "llm_call":
            return {
                provider: "gemini",
                model: "",
                prompt: "",
                temperature: 0.2
            };
        case "http_request":
            return {
                method: "GET",
                url: "",
                headers: {},
                body: null
            };
        case "db_write":
            return {
                label: ""
            };
        case "notify":
            return {
                webhookUrl: "",
                message: ""
            };
        case "conditional_branch":
            // Runner contract draft: compare field/operator/value against prior output.
            return {
                field: "",
                operator: "contains",
                value: ""
            };
        case "approval_gate":
            return {
                note: ""
            };
    }
}
function defaultTriggerConfig(type) {
    if (type === "webhook") {
        return {
            token: crypto.randomUUID()
        };
    }
    if (type === "scheduled") {
        return {
            cron: "0 * * * *"
        };
    }
    if (type === "database_event") {
        return {
            table: "",
            operation: "insert"
        };
    }
    return {};
}
function asText(value) {
    return typeof value === "string" ? value : "";
}
function asNumber(value, fallback) {
    return typeof value === "number" ? value : fallback;
}
function parseJson(raw, fallback) {
    if (!raw.trim()) return fallback;
    try {
        return JSON.parse(raw);
    } catch  {
        return fallback;
    }
}
function summarizeConfig(type, config) {
    if (type === "llm_call") {
        return `${asText(config.provider) || "provider"} ${asText(config.model) || "model"}${asText(config.prompt) ? " · prompt set" : ""}`;
    }
    if (type === "http_request") {
        return `${asText(config.method) || "GET"} ${asText(config.url) || "no URL yet"}`;
    }
    if (type === "db_write") {
        return "Writes step output to workflow_results";
    }
    if (type === "notify") {
        return asText(config.webhookUrl) ? "Webhook notification configured" : "Notification target missing";
    }
    if (type === "conditional_branch") {
        return `${asText(config.field) || "field"} ${asText(config.operator) || "contains"} ${asText(config.value) || "value"}`;
    }
    return asText(config.note) || "Approval required before continuing";
}
function StepConfigFields({ type, config, setConfig }) {
    function update(key, value) {
        setConfig({
            ...config,
            [key]: value
        });
    }
    if (type === "llm_call") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Provider"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: asText(config.provider),
                            onChange: (e)=>update("provider", e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "gemini",
                                    children: "gemini"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 135,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "groq",
                                    children: "groq"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 136,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "openrouter",
                                    children: "openrouter"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 137,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 132,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Model"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 141,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: asText(config.model),
                            onChange: (e)=>update("model", e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 140,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Prompt"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 145,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: asText(config.prompt),
                            onChange: (e)=>update("prompt", e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 144,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Temperature"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 149,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            type: "number",
                            min: "0",
                            max: "1",
                            step: "0.1",
                            value: asNumber(config.temperature, 0.2),
                            onChange: (e)=>update("temperature", Number(e.target.value))
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 150,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 148,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
            lineNumber: 131,
            columnNumber: 7
        }, this);
    }
    if (type === "http_request") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Method"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 167,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: asText(config.method) || "GET",
                            onChange: (e)=>update("method", e.target.value),
                            children: [
                                "GET",
                                "POST",
                                "PUT",
                                "PATCH",
                                "DELETE"
                            ].map((method)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: method,
                                    children: method
                                }, method, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 170,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 168,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 166,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "URL"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 177,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: asText(config.url),
                            onChange: (e)=>update("url", e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 178,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 176,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Headers JSON"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 181,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: JSON.stringify(config.headers ?? {}, null, 2),
                            onChange: (e)=>update("headers", parseJson(e.target.value, {}))
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 182,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 180,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Body JSON"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 188,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: JSON.stringify(config.body ?? null, null, 2),
                            onChange: (e)=>update("body", parseJson(e.target.value, null))
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 189,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 187,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
            lineNumber: 165,
            columnNumber: 7
        }, this);
    }
    if (type === "db_write") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "muted",
                    children: "Writes step output to workflow_results."
                }, void 0, false, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 201,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Result label"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 203,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: asText(config.label),
                            onChange: (e)=>update("label", e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 202,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
            lineNumber: 200,
            columnNumber: 7
        }, this);
    }
    if (type === "notify") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Webhook URL"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 214,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: asText(config.webhookUrl),
                            onChange: (e)=>update("webhookUrl", e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 215,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 213,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Message"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 218,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                            value: asText(config.message),
                            onChange: (e)=>update("message", e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 219,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 217,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
            lineNumber: 212,
            columnNumber: 7
        }, this);
    }
    if (type === "conditional_branch") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "inline-fields",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Field"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 229,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: asText(config.field),
                            onChange: (e)=>update("field", e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 230,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 228,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Operator"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 233,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                            value: asText(config.operator) || "contains",
                            onChange: (e)=>update("operator", e.target.value),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "contains",
                                    children: "contains"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "equals",
                                    children: "equals"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 236,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: "exists",
                                    children: "exists"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 237,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 234,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 232,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "field",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                            children: "Value"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 241,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            value: asText(config.value),
                            onChange: (e)=>update("value", e.target.value)
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 240,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
            lineNumber: 227,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "field",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                children: "Approval note"
            }, void 0, false, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 250,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                value: asText(config.note),
                onChange: (e)=>update("note", e.target.value)
            }, void 0, false, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 251,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
        lineNumber: 249,
        columnNumber: 5
    }, this);
}
_c = StepConfigFields;
function WorkflowBuilderPage() {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const routeParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const workflowId = routeParams.workflowId;
    const { currentOrg, isLoading: orgLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$org$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrg"])();
    const [workflow, setWorkflow] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [workflowName, setWorkflowName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [workflowDescription, setWorkflowDescription] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [expandedStepId, setExpandedStepId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editStepName, setEditStepName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [editStepType, setEditStepType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("llm_call");
    const [editStepConfig, setEditStepConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [newStepName, setNewStepName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newStepType, setNewStepType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("llm_call");
    const [newStepConfig, setNewStepConfig] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultStepConfig("llm_call"));
    const [newTriggerType, setNewTriggerType] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("manual");
    const [triggerJsonById, setTriggerJsonById] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const editable = canEdit(currentOrg?.myRole);
    const availableStepTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WorkflowBuilderPage.useMemo[availableStepTypes]": ()=>STEP_TYPES.filter({
                "WorkflowBuilderPage.useMemo[availableStepTypes]": (type)=>canManageStep(currentOrg?.myRole, type)
            }["WorkflowBuilderPage.useMemo[availableStepTypes]"])
    }["WorkflowBuilderPage.useMemo[availableStepTypes]"], [
        currentOrg?.myRole
    ]);
    const availableTriggerTypes = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "WorkflowBuilderPage.useMemo[availableTriggerTypes]": ()=>TRIGGER_TYPES.filter({
                "WorkflowBuilderPage.useMemo[availableTriggerTypes]": (type)=>canManageTrigger(currentOrg?.myRole, type)
            }["WorkflowBuilderPage.useMemo[availableTriggerTypes]"])
    }["WorkflowBuilderPage.useMemo[availableTriggerTypes]"], [
        currentOrg?.myRole
    ]);
    const loadWorkflow = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "WorkflowBuilderPage.useCallback[loadWorkflow]": async ()=>{
            if (!currentOrg) {
                setWorkflow(null);
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            setError(null);
            try {
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                    query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["WORKFLOW_DETAIL_QUERY"],
                    variables: {
                        workflowId
                    }
                });
                const row = response.body.data?.workflows_by_pk;
                if (!row || row.org_id !== currentOrg.id) {
                    setWorkflow(null);
                    setError("Workflow not found in the selected organization");
                    return;
                }
                setWorkflow(row);
                setWorkflowName(row.name);
                setWorkflowDescription(row.description ?? "");
                setTriggerJsonById(Object.fromEntries(row.triggers.map({
                    "WorkflowBuilderPage.useCallback[loadWorkflow]": (trigger)=>[
                            trigger.id,
                            JSON.stringify(trigger.config ?? {}, null, 2)
                        ]
                }["WorkflowBuilderPage.useCallback[loadWorkflow]"])));
            } catch (err) {
                setError(err instanceof Error ? err.message : "Could not load workflow");
            } finally{
                setIsLoading(false);
            }
        }
    }["WorkflowBuilderPage.useCallback[loadWorkflow]"], [
        currentOrg,
        workflowId
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WorkflowBuilderPage.useEffect": ()=>{
            loadWorkflow();
        }
    }["WorkflowBuilderPage.useEffect"], [
        loadWorkflow
    ]);
    function openStep(step) {
        setExpandedStepId(expandedStepId === step.id ? null : step.id);
        setEditStepName(step.name);
        setEditStepType(step.type);
        setEditStepConfig(step.config ?? defaultStepConfig(step.type));
    }
    function changeNewStepType(type) {
        setNewStepType(type);
        setNewStepConfig(defaultStepConfig(type));
    }
    function changeEditStepType(type) {
        setEditStepType(type);
        setEditStepConfig(defaultStepConfig(type));
    }
    async function saveWorkflow(e) {
        e.preventDefault();
        if (!workflow) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UPDATE_WORKFLOW_MUTATION"],
                variables: {
                    workflowId: workflow.id,
                    name: workflowName.trim(),
                    description: workflowDescription.trim() || null,
                    active: workflow.active
                }
            });
            await loadWorkflow();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not update workflow");
        }
    }
    async function toggleWorkflowActive() {
        if (!workflow) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UPDATE_WORKFLOW_MUTATION"],
                variables: {
                    workflowId: workflow.id,
                    name: workflow.name,
                    description: workflow.description,
                    active: !workflow.active
                }
            });
            await loadWorkflow();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not update workflow");
        }
    }
    async function deleteWorkflow() {
        if (!workflow || !confirm("Delete this workflow and all of its steps/triggers?")) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DELETE_WORKFLOW_MUTATION"],
                variables: {
                    workflowId: workflow.id
                }
            });
            router.push("/workflows");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not delete workflow");
        }
    }
    async function createStep(e) {
        e.preventDefault();
        if (!workflow || !canManageStep(currentOrg?.myRole, newStepType)) return;
        try {
            const nextOrder = (workflow.steps.at(-1)?.step_order ?? 0) + 1;
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREATE_STEP_MUTATION"],
                variables: {
                    workflowId: workflow.id,
                    stepOrder: nextOrder,
                    name: newStepName.trim(),
                    type: newStepType,
                    config: newStepConfig
                }
            });
            setNewStepName("");
            changeNewStepType(availableStepTypes[0] ?? "llm_call");
            await loadWorkflow();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not create step");
        }
    }
    async function updateStep(step) {
        if (!canManageStep(currentOrg?.myRole, step.type) || !canManageStep(currentOrg?.myRole, editStepType)) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UPDATE_STEP_MUTATION"],
                variables: {
                    stepId: step.id,
                    name: editStepName.trim(),
                    type: editStepType,
                    config: editStepConfig
                }
            });
            await loadWorkflow();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not update step");
        }
    }
    async function deleteStep(step) {
        if (!canManageStep(currentOrg?.myRole, step.type) || !confirm("Delete this step?")) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DELETE_STEP_MUTATION"],
                variables: {
                    stepId: step.id
                }
            });
            await loadWorkflow();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not delete step");
        }
    }
    async function moveStep(index, direction) {
        if (!workflow) return;
        const first = workflow.steps[index];
        const second = workflow.steps[index + direction];
        if (!first || !second || !canManageStep(currentOrg?.myRole, first.type) || !canManageStep(currentOrg?.myRole, second.type)) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["REORDER_STEPS_MUTATION"],
                variables: {
                    firstId: first.id,
                    firstOrder: first.step_order,
                    secondId: second.id,
                    secondOrder: second.step_order,
                    tempOrder: -Math.floor(Date.now() / 1000)
                }
            });
            await loadWorkflow();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not reorder steps");
        }
    }
    async function createTrigger(e) {
        e.preventDefault();
        if (!workflow || !canManageTrigger(currentOrg?.myRole, newTriggerType)) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CREATE_TRIGGER_MUTATION"],
                variables: {
                    workflowId: workflow.id,
                    triggerType: newTriggerType,
                    config: defaultTriggerConfig(newTriggerType)
                }
            });
            await loadWorkflow();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not create trigger");
        }
    }
    async function updateTrigger(trigger, active = trigger.active) {
        if (!canManageTrigger(currentOrg?.myRole, trigger.trigger_type)) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["UPDATE_TRIGGER_MUTATION"],
                variables: {
                    triggerId: trigger.id,
                    config: parseJson(triggerJsonById[trigger.id] ?? "{}", {}),
                    active
                }
            });
            await loadWorkflow();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not update trigger");
        }
    }
    async function deleteTrigger(trigger) {
        if (!canManageTrigger(currentOrg?.myRole, trigger.trigger_type) || !confirm("Delete this trigger?")) return;
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$nhost$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["nhost"].graphql.request({
                query: __TURBOPACK__imported__module__$5b$project$5d2f$graphql$2f$workflows$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DELETE_TRIGGER_MUTATION"],
                variables: {
                    triggerId: trigger.id
                }
            });
            await loadWorkflow();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Could not delete trigger");
        }
    }
    if (orgLoading || isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "page",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted",
                children: "Loading..."
            }, void 0, false, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 514,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
            lineNumber: 513,
            columnNumber: 7
        }, this);
    }
    if (!currentOrg) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "page",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted",
                children: [
                    "You're not in an organization yet. ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/organizations/new",
                        children: "Create one"
                    }, void 0, false, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 523,
                        columnNumber: 51
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 522,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
            lineNumber: 521,
            columnNumber: 7
        }, this);
    }
    if (!workflow) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "page",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/workflows",
                        children: "← Back to workflows"
                    }, void 0, false, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 533,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 532,
                    columnNumber: 9
                }, this),
                error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "error-text",
                    children: error
                }, void 0, false, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 535,
                    columnNumber: 18
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "muted",
                    children: "Workflow not found."
                }, void 0, false, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 535,
                    columnNumber: 58
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
            lineNumber: 531,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "page page-wide",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: "/workflows",
                    children: "← Back to workflows"
                }, void 0, false, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 543,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 542,
                columnNumber: 7
            }, this),
            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "error-text",
                children: error
            }, void 0, false, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 546,
                columnNumber: 17
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 24
                },
                children: editable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: saveWorkflow,
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "inline-fields",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "field",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: "Name"
                                        }, void 0, false, {
                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                            lineNumber: 553,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: workflowName,
                                            onChange: (e)=>setWorkflowName(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                            lineNumber: 554,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 552,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "field",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: "Description"
                                        }, void 0, false, {
                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                            lineNumber: 557,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            value: workflowDescription,
                                            onChange: (e)=>setWorkflowDescription(e.target.value)
                                        }, void 0, false, {
                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                            lineNumber: 558,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 556,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 551,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "button-row",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "submit",
                                    disabled: !workflowName.trim(),
                                    children: "Save workflow"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 562,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "secondary",
                                    onClick: toggleWorkflowActive,
                                    children: workflow.active ? "Pause" : "Activate"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 565,
                                    columnNumber: 15
                                }, this),
                                currentOrg.myRole === "owner" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    className: "secondary danger",
                                    onClick: deleteWorkflow,
                                    children: "Delete workflow"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 569,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    type: "button",
                                    disabled: true,
                                    title: "Workflow execution coming in a later phase",
                                    children: "Run"
                                }, void 0, false, {
                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                    lineNumber: 573,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 561,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 550,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            style: {
                                marginTop: 0
                            },
                            children: workflow.name
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 580,
                            columnNumber: 13
                        }, this),
                        workflow.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: workflow.description
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 581,
                            columnNumber: 38
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "muted",
                            children: "Viewer access · workflow execution coming in a later phase"
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 582,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                    lineNumber: 579,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 548,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                style: {
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Steps"
                    }, void 0, false, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 588,
                        columnNumber: 9
                    }, this),
                    workflow.steps.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                margin: 0
                            },
                            children: "No steps yet."
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 591,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 590,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stack",
                        children: workflow.steps.map((step, index)=>{
                            const stepEditable = canManageStep(currentOrg.myRole, step.type);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "plain-row",
                                        type: "button",
                                        onClick: ()=>openStep(step),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                    children: [
                                                        step.step_order,
                                                        ". ",
                                                        step.name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                    lineNumber: 601,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "muted",
                                                    children: [
                                                        " · ",
                                                        step.type
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                    lineNumber: 604,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "muted",
                                                    children: summarizeConfig(step.type, step.config ?? {})
                                                }, void 0, false, {
                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                    lineNumber: 605,
                                                    columnNumber: 23
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                            lineNumber: 600,
                                            columnNumber: 21
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 599,
                                        columnNumber: 19
                                    }, this),
                                    expandedStepId === step.id && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            marginTop: 16
                                        },
                                        children: stepEditable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "inline-fields",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "field",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    children: "Name"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                                    lineNumber: 615,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                                    value: editStepName,
                                                                    onChange: (e)=>setEditStepName(e.target.value)
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                                    lineNumber: 616,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                            lineNumber: 614,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "field",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                                    children: "Type"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                                    lineNumber: 619,
                                                                    columnNumber: 31
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: editStepType,
                                                                    onChange: (e)=>changeEditStepType(e.target.value),
                                                                    children: availableStepTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: type,
                                                                            children: type
                                                                        }, type, false, {
                                                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                                            lineNumber: 622,
                                                                            columnNumber: 35
                                                                        }, this))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                                    lineNumber: 620,
                                                                    columnNumber: 31
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                            lineNumber: 618,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                    lineNumber: 613,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepConfigFields, {
                                                    type: editStepType,
                                                    config: editStepConfig,
                                                    setConfig: setEditStepConfig
                                                }, void 0, false, {
                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                    lineNumber: 629,
                                                    columnNumber: 27
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "button-row",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            onClick: ()=>updateStep(step),
                                                            disabled: !editStepName.trim(),
                                                            children: "Save step"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                            lineNumber: 631,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "secondary",
                                                            onClick: ()=>moveStep(index, -1),
                                                            disabled: index === 0,
                                                            children: "Move up"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                            lineNumber: 634,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "secondary",
                                                            onClick: ()=>moveStep(index, 1),
                                                            disabled: index === workflow.steps.length - 1,
                                                            children: "Move down"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                            lineNumber: 637,
                                                            columnNumber: 29
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            className: "secondary danger",
                                                            onClick: ()=>deleteStep(step),
                                                            children: "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                            lineNumber: 645,
                                                            columnNumber: 29
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                    lineNumber: 630,
                                                    columnNumber: 27
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                            lineNumber: 612,
                                            columnNumber: 25
                                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "muted",
                                            children: "Your role can view this step but cannot edit this step type."
                                        }, void 0, false, {
                                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                            lineNumber: 651,
                                            columnNumber: 25
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 610,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, step.id, true, {
                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                lineNumber: 598,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 594,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 587,
                columnNumber: 7
            }, this),
            editable && availableStepTypes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "card",
                style: {
                    marginBottom: 24
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            marginTop: 0
                        },
                        children: "Add step"
                    }, void 0, false, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 666,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: createStep,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inline-fields",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "Name"
                                            }, void 0, false, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 670,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                value: newStepName,
                                                onChange: (e)=>setNewStepName(e.target.value)
                                            }, void 0, false, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 671,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 669,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "Type"
                                            }, void 0, false, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 674,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: newStepType,
                                                onChange: (e)=>changeNewStepType(e.target.value),
                                                children: availableStepTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: type,
                                                        children: type
                                                    }, type, false, {
                                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                        lineNumber: 677,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 675,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 673,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                lineNumber: 668,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StepConfigFields, {
                                type: newStepType,
                                config: newStepConfig,
                                setConfig: setNewStepConfig
                            }, void 0, false, {
                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                lineNumber: 684,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                type: "submit",
                                disabled: !newStepName.trim(),
                                children: "Add step"
                            }, void 0, false, {
                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                lineNumber: 685,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 667,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 665,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Triggers"
                    }, void 0, false, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 693,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "stack",
                        style: {
                            marginBottom: 16
                        },
                        children: workflow.triggers.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "card",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: 0
                                },
                                children: "No triggers yet."
                            }, void 0, false, {
                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                lineNumber: 697,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                            lineNumber: 696,
                            columnNumber: 13
                        }, this) : workflow.triggers.map((trigger)=>{
                            const triggerEditable = canManageTrigger(currentOrg.myRole, trigger.trigger_type);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "card",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "row-between",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: trigger.trigger_type
                                            }, void 0, false, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 705,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: trigger.active ? "Active" : "Paused"
                                            }, void 0, false, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 706,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 704,
                                        columnNumber: 19
                                    }, this),
                                    trigger.trigger_type === "webhook" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "muted",
                                        children: [
                                            "Token: ",
                                            asText(trigger.config?.token)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 709,
                                        columnNumber: 21
                                    }, this),
                                    triggerEditable ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "field",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                        children: "Config JSON"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                        lineNumber: 714,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                                                        value: triggerJsonById[trigger.id] ?? "{}",
                                                        onChange: (e)=>setTriggerJsonById({
                                                                ...triggerJsonById,
                                                                [trigger.id]: e.target.value
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                        lineNumber: 715,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 713,
                                                columnNumber: 23
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "button-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>updateTrigger(trigger),
                                                        children: "Save trigger"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                        lineNumber: 723,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "secondary",
                                                        onClick: ()=>updateTrigger(trigger, !trigger.active),
                                                        children: trigger.active ? "Pause" : "Activate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                        lineNumber: 726,
                                                        columnNumber: 25
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        className: "secondary danger",
                                                        onClick: ()=>deleteTrigger(trigger),
                                                        children: "Delete"
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                        lineNumber: 729,
                                                        columnNumber: 25
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 722,
                                                columnNumber: 23
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 712,
                                        columnNumber: 21
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "muted",
                                        children: "Your role can view this trigger but cannot edit it."
                                    }, void 0, false, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 735,
                                        columnNumber: 21
                                    }, this)
                                ]
                            }, trigger.id, true, {
                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                lineNumber: 703,
                                columnNumber: 17
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 694,
                        columnNumber: 9
                    }, this),
                    editable && availableTriggerTypes.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                style: {
                                    marginTop: 0
                                },
                                children: "Add trigger"
                            }, void 0, false, {
                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                lineNumber: 745,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                onSubmit: createTrigger,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                children: "Trigger type"
                                            }, void 0, false, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 748,
                                                columnNumber: 17
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: newTriggerType,
                                                onChange: (e)=>setNewTriggerType(e.target.value),
                                                children: availableTriggerTypes.map((type)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: type,
                                                        children: type
                                                    }, type, false, {
                                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                        lineNumber: 751,
                                                        columnNumber: 21
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                                lineNumber: 749,
                                                columnNumber: 17
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 747,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "submit",
                                        children: "Add trigger"
                                    }, void 0, false, {
                                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                        lineNumber: 757,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                                lineNumber: 746,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                        lineNumber: 744,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/workflows/[workflowId]/page.tsx",
                lineNumber: 692,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/workflows/[workflowId]/page.tsx",
        lineNumber: 541,
        columnNumber: 5
    }, this);
}
_s(WorkflowBuilderPage, "/x1YiIQKXROpMlyzvRF+9/ho46w=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$org$2d$context$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useOrg"]
    ];
});
_c1 = WorkflowBuilderPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "StepConfigFields");
__turbopack_context__.k.register(_c1, "WorkflowBuilderPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/graphql/workflows.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CREATE_STEP_MUTATION",
    ()=>CREATE_STEP_MUTATION,
    "CREATE_TRIGGER_MUTATION",
    ()=>CREATE_TRIGGER_MUTATION,
    "CREATE_WORKFLOW_MUTATION",
    ()=>CREATE_WORKFLOW_MUTATION,
    "DELETE_STEP_MUTATION",
    ()=>DELETE_STEP_MUTATION,
    "DELETE_TRIGGER_MUTATION",
    ()=>DELETE_TRIGGER_MUTATION,
    "DELETE_WORKFLOW_MUTATION",
    ()=>DELETE_WORKFLOW_MUTATION,
    "REORDER_STEPS_MUTATION",
    ()=>REORDER_STEPS_MUTATION,
    "UPDATE_STEP_MUTATION",
    ()=>UPDATE_STEP_MUTATION,
    "UPDATE_TRIGGER_MUTATION",
    ()=>UPDATE_TRIGGER_MUTATION,
    "UPDATE_WORKFLOW_MUTATION",
    ()=>UPDATE_WORKFLOW_MUTATION,
    "WORKFLOWS_FOR_ORG_QUERY",
    ()=>WORKFLOWS_FOR_ORG_QUERY,
    "WORKFLOW_DETAIL_QUERY",
    ()=>WORKFLOW_DETAIL_QUERY
]);
const WORKFLOWS_FOR_ORG_QUERY = `
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
`;
const WORKFLOW_DETAIL_QUERY = `
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
`;
const CREATE_WORKFLOW_MUTATION = `
  mutation CreateWorkflow($orgId: uuid!, $name: String!, $description: String) {
    insert_workflows_one(object: { org_id: $orgId, name: $name, description: $description }) {
      id
      name
    }
  }
`;
const UPDATE_WORKFLOW_MUTATION = `
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
`;
const DELETE_WORKFLOW_MUTATION = `
  mutation DeleteWorkflow($workflowId: uuid!) {
    delete_workflows_by_pk(id: $workflowId) {
      id
    }
  }
`;
const CREATE_STEP_MUTATION = `
  mutation CreateStep($workflowId: uuid!, $stepOrder: Int!, $name: String!, $type: String!, $config: jsonb!) {
    insert_workflow_steps_one(
      object: { workflow_id: $workflowId, step_order: $stepOrder, name: $name, type: $type, config: $config }
    ) {
      id
    }
  }
`;
const UPDATE_STEP_MUTATION = `
  mutation UpdateStep($stepId: uuid!, $name: String, $type: String, $config: jsonb) {
    update_workflow_steps_by_pk(
      pk_columns: { id: $stepId }
      _set: { name: $name, type: $type, config: $config }
    ) {
      id
    }
  }
`;
const DELETE_STEP_MUTATION = `
  mutation DeleteStep($stepId: uuid!) {
    delete_workflow_steps_by_pk(id: $stepId) {
      id
    }
  }
`;
const REORDER_STEPS_MUTATION = `
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
`;
const CREATE_TRIGGER_MUTATION = `
  mutation CreateTrigger($workflowId: uuid!, $triggerType: String!, $config: jsonb!) {
    insert_workflow_triggers_one(
      object: { workflow_id: $workflowId, trigger_type: $triggerType, config: $config }
    ) {
      id
    }
  }
`;
const UPDATE_TRIGGER_MUTATION = `
  mutation UpdateTrigger($triggerId: uuid!, $config: jsonb, $active: Boolean) {
    update_workflow_triggers_by_pk(
      pk_columns: { id: $triggerId }
      _set: { config: $config, active: $active }
    ) {
      id
      active
    }
  }
`;
const DELETE_TRIGGER_MUTATION = `
  mutation DeleteTrigger($triggerId: uuid!) {
    delete_workflow_triggers_by_pk(id: $triggerId) {
      id
    }
  }
`;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1mrc142._.js.map