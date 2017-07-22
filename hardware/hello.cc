// hello.cc
#include <node.h>
//#include "i2c_lib.h"

using namespace v8;

int address;
int fd;

void Open(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = Isolate::GetCurrent();
  HandleScope scope(isolate);

  String::Utf8Value dev(args[0]);
  uint8_t addr = args[1]->NumberValue();
  
  // fd = i2c_open(*dev, addr);
}

void SetDuty(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
  args.GetReturnValue().Set(String::NewFromUtf8(isolate, "world"));

  uint8_t data[] = {1, 2, 3, 4};
   //i2c_send(fd, data, 4);
}

void SetFrequncy(const FunctionCallbackInfo<Value>& args) {
  Isolate* isolate = args.GetIsolate();
}

void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "setDuty", SetDuty);
  NODE_SET_METHOD(exports, "setFrequncy", SetFrequncy);
  NODE_SET_METHOD(exports, "open", Open);
}

NODE_MODULE(addon, init)
