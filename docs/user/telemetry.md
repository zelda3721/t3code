# Privacy in the personal build

This fork disables upstream product analytics, T3 Connect and automatic upstream updates in its built-in Mac host policy. The same limits apply when loading an existing profile or an administrator policy. Clients can still pair directly with the host over a private network, including Tailscale.

## Agent feedback

The private host locks agent feedback off. Product events and feedback reports have no active analytics sender.

## Relay connection diagnostics

The desktop and self-hosted web clients ship without the upstream relay and tracing configuration. The private host also disables relay tracing through policy. Use the web interface served by your host for direct access.

## Mobile app diagnostics

The private iPhone build omits Expo Observe, official connection tracing and the upstream Expo update channel. Install a new private build to update the app.

## Agent activity for mobile notifications

The private build disables T3 Connect and its remote notification registration. Open the iPhone app to check activity on the paired host.

Providers, Tailscale and other integrations you choose make their own network connections. For example, when using a hosted model its provider processes the requests you send it.

## Export diagnostics to your own receiver

To send traces, metrics, or logs to an OpenTelemetry receiver, open
**Settings > Maintenance > Diagnostics**, select an environment, and enter each signal's OTLP HTTP
endpoint under **OpenTelemetry export** (for example `http://localhost:4318/v1/traces`). Save, then
restart that environment's server. The receiver must be reachable from the server's machine.
**Test** sends an empty export from the server to check an endpoint before or after you save it;
saved endpoints are checked when the section opens. Checks send authentication headers only to
the signal's currently running endpoint and do not follow redirects. To check a new endpoint
that requires authentication, save it and restart the server first.

`T3CODE_OTLP_*_URL` and standard `OTEL_EXPORTER_OTLP_*` environment variables override the saved
settings. An overridden signal shows **Set by environment** and names the variable that set it, and its
**Test** checks the running endpoint instead of the field. For endpoints saved here or set with `T3CODE_OTLP_*_URL`, set `T3CODE_OTLP_HEADERS` for
receivers that need authentication and `T3CODE_OTLP_PROTOCOL=http/protobuf` for receivers that do
not accept JSON. An endpoint set with `OTEL_EXPORTER_OTLP_*` takes its headers and protocol from
`OTEL_EXPORTER_OTLP_HEADERS` and `OTEL_EXPORTER_OTLP_PROTOCOL` instead.
