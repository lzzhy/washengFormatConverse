
token=$1
content='{"text":"版本更新\n项目名称：'$2'\n项目主页：'$3'"}'

echo $content

curl -X POST -H "Content-Type: application/json" -d '{"msg_type":"text","content":'$content'}'  https://open.feishu.cn/open-apis/bot/v2/hook/$token