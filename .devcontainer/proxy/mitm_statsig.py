from mitmproxy import http
import logging

logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# #mitmproxy

def response(flow: http.HTTPFlow) -> None:
    logging.debug(f"Response: {flow.request.pretty_url} - Status: {flow.response.status_code}")

def request(flow: http.HTTPFlow) -> None:
    logging.debug(f"Request: {flow.request.method} {flow.request.url} {flow.request.pretty_host}")
    if flow.request.url.endswith("/v1/get_config") and flow.request.method == "POST":
        logging.debug("Intercepted POST to /v1/get_config")
        flow.response = http.Response.make(
            status_code=200,
            content=b"""
            {
              "name": "rovo_dev_cli_client_config",
              "value": {
                "model_id": ["claude-sonnet-4@20250514"],
                "banned": false,
                "enable_efficient_agent": true
              },
              "group": "default",
              "rule_id": "default",
              "group_name": null
            }
            """,
            headers={"Content-Type": "application/json"}
        )
        logging.debug("Mock response sent")
    else:
        logging.debug(f"No match for {flow.request.url}")

"""
Check rovodev 1.2.10 for the free access to Sonnet 4


Full real output

curl -v -X POST https://api.statsig.com/v1/get_config \
  -H "statsig-api-key: client-K86FOx7CB7wxvmrFeFOrGj7iRG2t7pC0EjBd5VUwi9Q" \
  -H "Content-Type: application/json" \
  -d '{"user": {"userID": "k933933933@gmail.com"}, "configName": "rovo_dev_cli_client_config"}' \
  --max-time 10

{"name":"rovo_dev_cli_client_config","value":{"model_id":["anthropic:claude-sonnet-4@20250514","bedrock:anthropic.claude-3-7-sonnet-20250219-v1:0","anthropic:claude-3-5-sonnet-v2@20241022","bedrock:anthropic.claude-3-5-sonnet-20241022-v2:0"],"banned":false,"enable_efficient_agent":true},"group":"default","rule_id":"default","group_name":null}%

Failed to start Rovo Dev CLI: Model should be one of ['claude-3-5-sonnet-v2@20241022', 'claude-3-7-sonnet@20250219',
'claude-sonnet-4@20250514', 'gemini-2.5-pro', 'gemini-2.5-flash', 'anthropic.claude-3-5-sonnet-20241022-v2:0',
'anthropic.claude-3-7-sonnet-20250219-v1:0', 'anthropic.claude-sonnet-4-20250514-v1:0']


RESULTS:

anthropic:claude-3-5-sonnet-v2@20241022 => old Gemini model O_o
anthropic:claude-sonnet-4@20250514      => Claude 3.5
bedrock:anthropic.claude-3-7-sonnet-20250219-v1:0 => Claude 3.5 ??? v1?
anthropic.claude-sonnet-4-20250514-v1:0 => fail
claude-sonnet-4@20250514 => Claude 3.5

So, no free dinner :(
"""
