#include <iostream>
#include <cstdlib>
#include <string>
#include <vector>
#include <sstream>
#include <fstream>

const int MAX_IP_SUFFIX = 255;
const int PING_TIMEOUT_MS = 4000;

bool isActiveIP(const std::string& ip) {
    std::string command = "ping -n 1 -w " + std::to_string(PING_TIMEOUT_MS) + " " + ip + " > nul 2>&1";
    return system(command.c_str()) == 0;
}

bool isInArpTable(const std::string& ip) {
    std::string command = "arp -a";
    std::string result;
    std::ifstream pipe(command.c_str());
    std::stringstream buffer;
    buffer << pipe.rdbuf();
    result = buffer.str();

    return result.find(ip) != std::string::npos;
}

void scanNetwork(const std::string& baseIP) {
    std::vector<std::string> freeIPs;

    std::cout << "Searching for free IP addresses in network " << baseIP << "1-" << baseIP << MAX_IP_SUFFIX << ":\n";
    for (int i = 1; i <= MAX_IP_SUFFIX; ++i) {
        std::string ip = baseIP + std::to_string(i);
        if (!isActiveIP(ip) && !isInArpTable(ip)) {
            freeIPs.push_back(ip);
            std::cout << ip << " - Free\n";
        }
    }

    if (freeIPs.empty()) {
        std::cout << "All IP addresses in the range are occupied.\n";
    }
}

int main() {
    std::string baseIP = "192.168.100.";
    scanNetwork(baseIP);
    std::cout << "Search completed.\n";
    return 0;
}