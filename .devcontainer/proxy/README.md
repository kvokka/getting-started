# Proxy with HTTP/HTTPS Support setup

It was picked `mitmproxy` to substitute some custom requests.

## Installation

1. `cd .devcontainer/proxy`
2. Install `mitmproxy` on the host machine. You can follow the [official installation guide](https://docs.mitmproxy.org/stable/overview-installation/).
3. If `mitmproxy` sub-folder if empty or missing run `mitmproxy --set confdir=mitmproxy` in the host machine and quit it. This will create the necessary certificate authority (CA) files.
4. grep `#mitmproxy` and uncomment the lines, adjust `run.sh` and `mitm_statsig.py` files with required proxy functionality.
5. Run the `run.sh` script on the host machine to start `mitmproxy` with the necessary configurations.
6. Rebuild the devcontainer.

## Details

On the first run `mitmproxy` creates a certificate authority (CA) and by default stores it in the `~/.mitmproxy` directory, but for this case we store it in the `.devcontainer/proxy/mitmproxy`. This CA's should be the same in the host machine and in the devcontainer, so that the requests can be intercepted and decrypted. (ofc the CA should be trusted in the host machine).

The proxy have [transparent mode](https://docs.mitmproxy.org/stable/howto/transparent/) but in docker-desktop it is not possible to use it, so the proxy is configured to listen on port `8888` for HTTP and HTTPS requests and it's supposed to run it on the host machine.

On the devcontainer in the contrast is should be configured to use the proxy on the host machine.

Another spot that suck soul, is that the CA config should be set in multiple
places, so that it snot just duplicated code, but a necessity. See this [issue](https://github.com/microsoft/vscode-remote-release/issues/6092#issuecomment-2725401194) for more details.

Following that guide the certificate should be installed in the host machine for docker desktop. For MacOS it should be done in the Keychain => System => Certificates.

Logs are stored in logs folder
