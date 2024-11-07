import { StatusType } from "@/interfaces/apiStatus";

export const STATUS: StatusType = {
  // Informational Responses (1xx)
  CONTINUE: 100, // The server has received the request headers, and the client should proceed to send the request body.
  SWITCHING_PROTOCOLS: 101, // The requester has asked the server to switch protocols, and the server has agreed to do so.
  PROCESSING: 102, // WebDAV; the server has received and is processing the request, but no response is available yet.
  EARLY_HINTS: 103, // Used to return some response headers before final HTTP message.

  // Successful Responses (2xx)
  OK: 200, // The request was successful. Standard response for successful HTTP requests.
  CREATED: 201, // The request has been fulfilled, resulting in the creation of a new resource.
  ACCEPTED: 202, // The request has been accepted for processing but not completed.
  NON_AUTHORITATIVE_INFORMATION: 203, // The server successfully processed the request but is returning information from another source.
  NO_CONTENT: 204, // The server successfully processed the request but is not returning any content.
  RESET_CONTENT: 205, // The server successfully processed the request, but the client should reset the view.
  PARTIAL_CONTENT: 206, // The server is delivering only part of the resource due to a range header sent by the client.
  MULTI_STATUS: 207, // WebDAV; conveys information about multiple resources.
  ALREADY_REPORTED: 208, // WebDAV; used inside a `<dav:propstat>` response element to avoid enumerating the internal members of multiple bindings.
  IM_USED: 226, // The server has fulfilled a GET request for the resource and is returning a representation of the result of one or more instance manipulations.

  // Redirection Messages (3xx)
  MULTIPLE_CHOICES: 300, // There are multiple options for the resource the client may follow.
  MOVED_PERMANENTLY: 301, // This and all future requests should be directed to the given URI.
  FOUND: 302, // The resource was found, but at a different URI. Use for temporary redirects.
  SEE_OTHER: 303, // The response to the request can be found under another URI using the GET method.
  NOT_MODIFIED: 304, // Indicates that the resource has not been modified since the version specified by the request headers.
  USE_PROXY: 305, // The requested resource is available only through a proxy (no longer used due to security concerns).
  SWITCH_PROXY: 306, // No longer used. Was used to indicate subsequent requests should use a specified proxy.
  TEMPORARY_REDIRECT: 307, // In this case, the request should be repeated with another URI, but future requests should still use the original URI.
  PERMANENT_REDIRECT: 308, // The request and all future requests should be repeated using another URI.

  // Client Error Responses (4xx)
  BAD_REQUEST: 400, // The server could not understand the request due to invalid syntax.
  UNAUTHORIZED: 401, // The client must authenticate itself to get the requested response.
  PAYMENT_REQUIRED: 402, // Reserved for future use. Intended for digital payment systems.
  FORBIDDEN: 403, // The client does not have access rights to the content.
  NOT_FOUND: 404, // The server cannot find the requested resource.
  METHOD_NOT_ALLOWED: 405, // The method is not allowed for the requested resource.
  NOT_ACCEPTABLE: 406, // The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
  PROXY_AUTHENTICATION_REQUIRED: 407, // The client must first authenticate itself with the proxy.
  REQUEST_TIMEOUT: 408, // The server timed out waiting for the request.
  CONFLICT: 409, // The request conflicts with the current state of the server.
  GONE: 410, // The requested resource is no longer available and will not be available again.
  LENGTH_REQUIRED: 411, // The request did not specify the length of its content, which is required by the requested resource.
  PRECONDITION_FAILED: 412, // The server does not meet one of the preconditions that the requester put on the request.
  PAYLOAD_TOO_LARGE: 413, // The request is larger than the server is willing or able to process.
  URI_TOO_LONG: 414, // The URI provided was too long for the server to process.
  UNSUPPORTED_MEDIA_TYPE: 415, // The media format of the requested data is not supported by the server.
  RANGE_NOT_SATISFIABLE: 416, // The range specified by the Range header field in the request cannot be fulfilled.
  EXPECTATION_FAILED: 417, // The server cannot meet the requirements of the Expect request-header field.
  IM_A_TEAPOT: 418, // This code was defined in 1998 as an April Fools' joke and is not expected to be implemented by actual HTTP servers.
  MISDIRECTED_REQUEST: 421, // The request was directed at a server that is not able to produce a response.
  UNPROCESSABLE_ENTITY: 422, // WebDAV; the request was well-formed but was unable to be followed due to semantic errors.
  LOCKED: 423, // WebDAV; the resource being accessed is locked.
  FAILED_DEPENDENCY: 424, // WebDAV; the request failed due to failure of a previous request.
  TOO_EARLY: 425, // Indicates that the server is unwilling to risk processing a request that might be replayed.
  UPGRADE_REQUIRED: 426, // The client should switch to a different protocol.
  PRECONDITION_REQUIRED: 428, // The server requires the request to be conditional.
  TOO_MANY_REQUESTS: 429, // The user has sent too many requests in a given amount of time ("rate limiting").
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431, // The server is unwilling to process the request because its header fields are too large.
  UNAVAILABLE_FOR_LEGAL_REASONS: 451, // The user requested a resource that cannot be legally provided, such as a web page censored by a government.

  // Server Error Responses (5xx)
  INTERNAL_SERVER_ERROR: 500, // The server encountered an unexpected condition that prevented it from fulfilling the request.
  NOT_IMPLEMENTED: 501, // The server does not support the functionality required to fulfill the request.
  BAD_GATEWAY: 502, // The server, while acting as a gateway or proxy, received an invalid response from the upstream server.
  SERVICE_UNAVAILABLE: 503, // The server is not ready to handle the request, typically because it is overloaded or down for maintenance.
  GATEWAY_TIMEOUT: 504, // The server, while acting as a gateway or proxy, did not get a response in time from the upstream server.
  HTTP_VERSION_NOT_SUPPORTED: 505, // The HTTP version used in the request is not supported by the server.
  VARIANT_ALSO_NEGOTIATES: 506, // Transparent content negotiation for the request results in a circular reference.
  INSUFFICIENT_STORAGE: 507, // WebDAV; the server is unable to store the representation needed to complete the request.
  LOOP_DETECTED: 508, // WebDAV; the server detected an infinite loop while processing a request.
  NOT_EXTENDED: 510, // Further extensions to the request are required for the server to fulfill it.
  NETWORK_AUTHENTICATION_REQUIRED: 511, // The client needs to authenticate to gain network access.
};