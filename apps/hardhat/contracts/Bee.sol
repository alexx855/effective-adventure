//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import '@openzeppelin/contracts/utils/Counters.sol';
import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/utils/Strings.sol';
import 'base64-sol/base64.sol';
import 'hardhat/console.sol';
import './HexStrings.sol';
import './ToColor.sol';

//learn more: https://docs.openzeppelin.com/contracts/3.x/erc721

// GET LISTED ON OPENSEA: https://testnets.opensea.io/get-listed/step-two

contract Bee is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using HexStrings for uint160;
    using ToColor for bytes3;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721('Bee', 'BEE') {
        // RELEASE THE BeeS!
    }

    mapping(uint256 => bytes3) public color;
    mapping(uint256 => bytes32) public genes;

    uint256 mintDeadline = block.timestamp + 24 hours;

    function mintItem() public returns (uint256) {
        require(block.timestamp < mintDeadline, 'DONE MINTING');
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        console.log('Minting new bee with id #% ', id);
        // console.log("Gene 0: ", blockhash(block.number - 1));
        console.log('Gene 1: ', msg.sender);
        console.log('Gene 2: ', address(this));
        _mint(msg.sender, id);

        genes[id] = keccak256(
            abi.encodePacked(
                blockhash(block.number - 1),
                // TODO: add size and scale in base
                msg.sender,
                address(this)
            )
        );

        color[id] =
            bytes2(genes[id][0]) |
            (bytes2(genes[id][1]) >> 8) |
            (bytes3(genes[id][2]) >> 16);

        return id;
    }

    function mintItemToHive() public returns (uint256) {
        require(block.timestamp < mintDeadline, 'DONE MINTING');
        _tokenIds.increment();

        uint256 id = _tokenIds.current();
        console.log('Minting new bee with id #% ', id);
        // console.log("Gene 0: ", blockhash(block.number - 1));
        console.log('Gene 1: ', msg.sender);
        console.log('Gene 2: ', address(this));
        _mint(msg.sender, id);

        genes[id] = keccak256(
            abi.encodePacked(
                blockhash(block.number - 1),
                // TODO: add size and scale in base
                msg.sender,
                address(this)
            )
        );

        color[id] =
            bytes2(genes[id][0]) |
            (bytes2(genes[id][1]) >> 8) |
            (bytes3(genes[id][2]) >> 16);

        return id;
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        require(_exists(id), 'not exist');
        string memory name = string(abi.encodePacked('Bee #', id.toString()));
        string memory description = string(
            abi.encodePacked('This Bee has the color #', color[id].toColor())
        );
        string memory image = Base64.encode(bytes(generateSVGofTokenById(id)));

        return
            string(
                abi.encodePacked(
                    'data:application/json;base64,',
                    Base64.encode(
                        bytes(
                            abi.encodePacked(
                                '{"name":"',
                                name,
                                '", "description":"',
                                description,
                                '", "external_url":"https://bee-dao.web.app/token/',
                                id.toString(),
                                '", "attributes": [{"trait_type": "color", "value": "#',
                                color[id].toColor(),
                                '"}], "owner":"',
                                (uint160(ownerOf(id))).toHexString(20),
                                '", "image": "',
                                'data:image/svg+xml;base64,',
                                image,
                                '"}'
                            )
                        )
                    )
                )
            );
    }

    function generateSVGofTokenById(uint256 id)
        internal
        view
        returns (string memory)
    {
        string memory svg = string(
            abi.encodePacked(
                '<svg width="400" height="400" viewBox="0 0 59 59" xmlns="http://www.w3.org/2000/svg">',
                renderTokenById(id),
                '</svg>'
            )
        );

        return svg;
    }

    // TODO: kill the bee update image
    // '<filter id="grayscale">',
    //   '<feColorMatrix type="saturate" values="0.10"/>',
    // '</filter>'

    // Visibility is `public` to enable it being called by other contracts for composition.
    function renderTokenById(uint256 id) public view returns (string memory) {

        // We split the SVG at the part where it asks for the background color.
        // TODO: test optimized svg, name parts https://jakearchibald.github.io/svgomg/
        string memory svgPartOne = '<path class="st0" d="M53.2 49.9 62 60.8l-13.3-4.3 4.5-6.6z"/>';
        string memory svgPartTwo = '<path class="st1" d="m51.5 30.7-.2 2.6 1.9-1.8-.6 2.5 2.1-1.6-.8 2.5 2.2-1.4-1.1 2.4 2.4-1L56 37l2.5-.7-1.7 1.9 2.6-.3-2 1.7 2.6.1-2.2 1.4 2.6.5-2.4 1 2.5.8-2.5.8 2.4 1.1-2.6.5 2.2 1.4-2.6.2 2.1 1.6h-2.7l1.9 1.9-2.7-.4 1.6 2.1-2.6-.7 1.4 2.2-2.4-.9 1.2 2.3-2.4-1.1.9 2.4-2.3-1.4.7 2.5-2.1-1.6.5 2.6-2-1.7.3 2.6L47 58v2.6l-1.7-2-.2 2.6-1.5-2.2-.4 2.6-1.2-2.2-.6 2.5-1.1-2.4-.8 2.5-1-2.4-1 2.4-.8-2.5-1.1 2.4-.6-2.6-1.3 2.3-.4-2.6-1.5 2.2-.2-2.6-1.7 2V58l-1.8 1.9.3-2.6-2 1.7.5-2.6-2.1 1.6.7-2.5-2.3 1.4.9-2.4-2.4 1.1 1.2-2.3-2.5.9 1.4-2.2-2.6.7 32.3-22z"/>';
        // string svgPartTree = '<path class="st0" d="m10.5 39.6 36.6-11.9-.5 2.5 2.1-1.6-.8 2.5 2.2-1.4-1.1 2.4 2.4-1-1.4 2.2 2.5-.7-1.7 1.9 2.6-.3-2 1.7 2.6.1-2.2 1.3 2.6.5-2.4 1.1 2.5.8-2.5.8 2.4 1.1-2.6.5 2.2 1.4-2.6.2 2.1 1.6-2.6-.1 1.9 1.9-2.8-.3 1.6 2.1-2.6-.7 1.4 2.2-2.4-.9 1.2 2.3-2.4-1.1.9 2.4-2.3-1.4.7 2.5-2.1-1.6.5 2.6-2-1.7.3 2.6-1.8-1.8v2.6l-1.7-2-.2 2.6-1.5-2.2-.4 2.6-1.2-2.2-.6 2.6-1.1-2.4-.8 2.5-1-2.4-1 2.4-.8-2.5-1.2 2.4-.6-2.6-1.3 2.3-.4-2.6-1.5 2.2-.2-2.6-1.7 2v-2.6L22 56.3l.3-2.6-2 1.7.5-2.6-2.1 1.6.7-2.5-2.3 1.4.9-2.4-2.4 1.1 1.2-2.3-2.5.9 1.4-2.2-2.6.7 1.6-2.1-2.6.4 1.9-1.9-2.6.1 2.1-1.6-2.5-.5 2.2-1.4-2.6-.5 2.4-1.1-2.5-.9z"/>'
        // string svgPartFour = '<g style="opacity:.3"><path class="st3" d="M60 4.3C56.4-.2 49.8 2 45.2 9.3c-4.6 7.3-8 20-8 20s15.5 2.6 20.1-4.7C62 17.3 63.7 8.8 60 4.3M3.9 8.9C.4 13.2 2 21.3 6.5 28.2s19.8 4.3 19.8 4.3-3.3-12.1-7.8-19-11-9-14.6-4.6"/></g>'
        // string svgPartFive = '<path class="st1" d="m33.6 25.2 1-1.8.3 2 1.1-1.7.2 2 1.2-1.7.1 2 1.3-1.6-.1 2 1.4-1.5-.3 2 1.6-1.3-.5 2 1.7-1.1-.7 1.9 1.9-.9-1 1.8 2-.7-1.2 1.6 2-.4-1.5 1.5 2.1-.1-1.6 1.2 2.1.2-1.8 1 2 .4-1.9.8 2 .6-2 .7 1.9.9-2 .5 1.8 1.1-2.1.3 1.7 1.3-2.3.3 1.5 1.4-2.1-.2 1.4 1.6-2-.3 1.2 1.7-2-.6 1 1.8-2-.8.9 1.9-1.9-.9.7 2-1.8-1.1.5 2-1.7-1.3.3 2-1.5-1.4.1 2.1-1.4-1.5-.1 2.1-1.3-1.7-.3 2-1.1-1.8-.5 2-1-1.8-.6 2-.8-1.9-.8 1.9-.6-2-1 1.8-.5-2-1.1 1.8-.3-2-1.1 1.7-.1-2.1-1.4 1.5.1-2.1-1.5 1.4.3-2-1.7 1.3.5-2-1.8 1.1.7-2-1.9.9.9-1.9-2 .7 1-1.8-2 .6 18.4-19.4z"/>'
        // string svgPartSix = '<path class="st0" d="m9.9 33.1 1.7-.6-1.7-.8 1.8-.4-1.6-.9 1.8-.3-1.5-1.1h1.9L11 27.7l1.8.2-1.1-1.4 1.8.5-.9-1.6 1.7.7-.7-1.7 1.6.9-.5-1.8 1.5 1.1-.3-1.8 1.3 1.2-.2-1.8 1.2 1.4v-1.8l1.1 1.5.1-1.8 1 1.5.3-1.8.9 1.6.4-1.8.8 1.7.5-1.8.7 1.7.6-1.8.6 1.7.6-1.7.6 1.8.7-1.7.5 1.8.8-1.7.4 1.8.9-1.6.3 1.8 1-1.5.1 1.8 1.1-1.5v1.7l1.2-1.4-.3 1.9 1.3-1.3-.3 1.9 1.4-1.1-.5 1.7 1.6-.9-.8 1.7 1.7-.7-.9 1.6 1.7-.5-1.1 1.5 1.8-.2-1.4 1.3h1.8l-1.5 1.1 1.8.2-1.6.9 1.7.4-1.6.8 1.7.6-1.7.7 1.6.8-1.7.5 1.5 1-1.8.3 1.5 1.1-1.8.2 1.4 1.3h-1.8l1.2 1.4-1.8-.2 1.1 1.5-1.8-.4 1 1.6-1.7-.6.8 1.7-1.7-.7.7 1.8-1.6-.9.5 1.8-1.6-.9.3 1.9-1.4-1.2.2 1.9-1.3-1.3v2l-1.2-1.5-.2 1.9-1-1.6-.4 1.9-.9-1.7-.6 1.8-.7-1.7-.7 1.8-.6-1.8-.9 1.6-.4-1.9-1 1.6-.2-1.9-1.2 1.4v-1.9l-1.3 1.3.2-1.9-1.5 1.3.3-1.9-1.5 1.1.5-1.8-1.7.8.7-1.8-1.7.7.8-1.7-1.7.6 1-1.6-1.8.4 1.1-1.5-1.8.2 1.3-1.4h-1.8l1.4-1.3-1.8-.2 1.5-1.1-1.8-.3 1.6-1-1.8-.5 1.7-.8-2-.8z"/>'
        // string svgPartSeven = '<circle class="st4" cx="17.4" cy="32.5" r="5.4"/>'
        // string svgPartEight = '<circle transform="rotate(-25.001 27.356 33.113)" class="st4" cx="27.4" cy="33.1" r="5.4"/>'
        // string svgPartNine = '<path class="st0" d="M36.3 16.9c-5.5-.1-8.7 1.9-10.3 6-.2.6.7.8 1 .3 1.3-2.6 3.5-5.6 9.3-5.3.7 0 .7-1 0-1M17.8 24.3c-3.8-3.9-7.5-4.8-11.6-2.9-.6.3-.1 1.1.5.9 2.8-.9 6.4-1.5 10.3 2.8.6.3 1.3-.4.8-.8"/>'
        // string svgPartTen = '<circle class="st0" cx="18.5" cy="33" r="3.1"/>'
        // string svgPartEleven = '<ellipse transform="rotate(-25.001 26.282 33.029)" class="st0" cx="26.3" cy="33" rx="3.3" ry="3.2"/>'

        string memory finalSvg = string(abi.encodePacked(svgPartOne, svgPartTwo));

        string memory render = string(
            abi.encodePacked(
                '<defs><style>',
                '.cls-1{fill:#222;}',
                '.cls-2{fill:#',
                color[id].toColor(),
                ';}',
                '.cls-3{opacity:0.3;}',
                '.cls-4{fill:#',
                color[id].toColor(),
                ';}',
                '.cls-5{fill:#fff;}',
                '</style></defs>',
                finalSvg
            )
        );

        return render;
    }

    function uint2str(uint256 _i)
        internal
        pure
        returns (string memory _uintAsString)
    {
        if (_i == 0) {
            return '0';
        }
        uint256 j = _i;
        uint256 len;
        while (j != 0) {
            len++;
            j /= 10;
        }
        bytes memory bstr = new bytes(len);
        uint256 k = len;
        while (_i != 0) {
            k = k - 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }
}
