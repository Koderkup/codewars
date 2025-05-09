#include <iostream>
#include <cstdlib>
#include <string>
#include <vector>
#include <sstream>
#include <algorithm>
#include <cctype> 

const int MAX_IP_SUFFIX = 255;
const int PING_TIMEOUT_MS = 4000;


bool isValidIPAddress(const std::string& ip) {
    std::istringstream iss(ip);
    std::string segment;
    int segmentCount = 0;
    while (std::getline(iss, segment, '.')) {
        segmentCount++;
        try {
            int num = std::stoi(segment);
            if (num < 0 || num > 255) {
                return false;
            }
        } catch (const std::invalid_argument& e) {
            return false;
        } catch (const std::out_of_range& e) {
            return false;
        }
    }
    return segmentCount == 4;
}

std::vector<std::string> getUsedIPs() {
    std::vector<std::string> ips;
    FILE* pipe = _popen("arp -a", "r");
    if (!pipe) {
        std::cerr << "Error executing arp -a command" << std::endl;
        return ips;
    }

    char buffer[128];
    while (fgets(buffer, 128, pipe) != nullptr) {
        std::string line(buffer);
        std::istringstream ss(line);
        std::string ip;
        ss >> ip;
        if (ip.find('.') != std::string::npos) {
            ips.push_back(ip);
        }
    }
    _pclose(pipe);

    ips.erase(std::remove_if(ips.begin(), ips.end(), [](const std::string& ip) {
        return !isValidIPAddress(ip);
    }), ips.end());

    return ips;
}

bool isActiveIP(const std::string& ip) {
    std::string command = "ping -n 1 -w " + std::to_string(PING_TIMEOUT_MS) + " " + ip + " > nul 2>&1";
    return system(command.c_str()) == 0;
}

void scanNetwork(const std::string& baseIP) {
    int dotCount = 0;
    for (char c : baseIP) {
        if (c == '.') {
            dotCount++;
        }
    }
    if (dotCount != 3) {
        std::cerr << "Invalid base IP address format: " << baseIP << std::endl;
        return;
    }

    std::vector<std::string> usedIPs = getUsedIPs();

    std::cout << "Available IP addresses:\n";
    for (int i = 1; i <= MAX_IP_SUFFIX; ++i) {
        std::string ip = baseIP + std::to_string(i);
        if (std::find(usedIPs.begin(), usedIPs.end(), ip) == usedIPs.end() && !isActiveIP(ip)) {
            std::cout << ip << std::endl;
        }
    }
}

int main() {
    std::string baseIP = "192.168.100.";
    scanNetwork(baseIP);
    return 0;
}